// @charset "utf-8";

define(function(require, exports, module) {
	var clientApi = require('../public/clientapi');
	var ThsClientCache = {
		
		_cacheExpires	:600, // 以秒为单位
		
		_cacheKeyPre	: '__l2homepage',
		
		_cacheExpiresPre	: '__expires',
		
		_thsCache	: new ThsCache(),
		
		setCacheExpires	: function (cacheExpires) {
			var self = this;
			if (parseInt(cacheExpires) > 0) {
				self._cacheExpiresPre	= parseInt(cacheExpires);
			}
		},
		
		setCache : async function (cacheKey, cacheValue, cacheExpires) {
			var self = this;
			// 设置缓存值
			var storageCacheKey	= self.getCacheKey(cacheKey);
			var storageCacheValue = JSON.stringify(cacheValue);
			await self._thsCache.setValue(storageCacheKey, storageCacheValue);
			
			// 设置缓存值
			cacheExpires	= parseInt(cacheExpires) > 0 ? parseInt(cacheExpires) : self._cacheExpiresPre;
			var storageExpiresKey	= self.getExpiresKey(cacheKey);
			var storageExpiresValue	= (new Date()).getTime() + cacheExpires * 1000;
			await self._thsCache.setValue(storageExpiresKey, storageExpiresValue);
		},
		
		getCacheKey	: function (cacheKey) {
			var self = this;
			return self._cacheKeyPre + '.' + cacheKey;
		},
		
		getExpiresKey : function (cacheKey) {
			var self = this;
			return self._cacheKeyPre + '.' + cacheKey + '.' + self._cacheExpiresPre;
		},
		
		/**
		 * @return undefined (如果失效或者没有设置值) | mixed
		 */
		getCache : async function (cacheKey) {
			var self = this;
			// 读取失效时间，如果没有或者小于当前时间则失效
			var expiresValue	= await self._thsCache.getValue(self.getExpiresKey(cacheKey));
			if ((new Date()).getTime() > expiresValue) {
				return undefined;
			} else {
				return $.evalJSON(await self._thsCache.getValue(self.getCacheKey(cacheKey)));
			}
		}
		
	};

	module.exports = ThsClientCache;
});

