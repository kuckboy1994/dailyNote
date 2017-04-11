// @charset "utf-8";

define(function(require, exports, module) {

	var userPath = null;
	var thsRobotPath = null;
	var fis = null;
	var fos = null;
	try {

		fis = new ThsFileReader();
		fos = new ThsFileWriter();
	} catch (exp) {}
	var clientData = {
		getFileContent: async function(file) {
			if (!userPath)
			{
				var path = await ThsExternal.getUserPath();
				userPath = path;
			}
			thsRobotPath = userPath + 'level2_vote\\';
			if (null === fis) {
				return false;
			}
			var str = false;
			if (await fis.open(thsRobotPath + file)) {
				try {
					str = await fis.readDes();
				} catch (exp) {}
				await fis.close();
			}
			if (false === str) {
				return false;
			}
			// return eval('(' + str + ')');
		},
		writeFileContent: async function(file, jsonstr) {
			if (!userPath)
			{
				var path = await ThsExternal.getUserPath();
				userPath = path;
			}
			var str = '';
			if (null === fos) {
				return false;
			}
			if (await fos.open(thsRobotPath + file)) {
				try {
					str = await fos.writeDes(jsonstr);
				} catch (exp) {}
				await fos.close();
			}
		}
	};

	module.exports = clientData;
});
