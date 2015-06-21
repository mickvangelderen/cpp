#!node

var fs = require('fs');
var child_process = require('child_process');

var compiler = {
	process: null,
	command: 'msbuild.bat',
	arguments: [
		'myapp.sln',
		'/verbosity:minimal',
		'/p:Configuration=Release'
	],
	options: { stdio: 'pipe', cwd: 'build' }
};

var application = {
	process: null,
	command: 'build/Release/myapp.exe',
	options: { stdio: 'pipe' }
};

var recompile = false;

function spawn(options) {
	var child = child_process.spawn(
		options.command,
		options.arguments || [],
		options.options || {})
	child.stdout.pipe(process.stdout);
	return child;
}

function relaunch() {
	if (application.process) application.process.kill();
	application.process = spawn(application);
	application.process.on('exit', function(code) {
		application.process = null;
	});
}

function compile() {
	if (compiler.process) {
		recompile = true;
		return;
	}
	recompile = false;
	compiler.process = spawn(compiler);
	compiler.process.on('exit', function(code, signal) {
		compiler.process = null;
		if (recompile) return compile();
		if (code == 0) return relaunch();
	});
}

compile();

fs.watch('myapp', { recursive: true }, function (event, filename) {
	if (!/.*\.(cpp|hpp)$/.test(filename)) return;
	compile();
});
