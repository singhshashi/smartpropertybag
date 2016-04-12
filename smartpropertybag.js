smartpropertybag = function () {
	this.obj = {};
};


smartpropertybag.prototype.defineSmartProperty = function(propertyName, defaultValue, persistent) {
	var valueType = typeof defaultValue;
	var descriptor = {configurable:false,enumerable:true};
	if (persistent === true) {
		if (typeof localStorage === 'undefined') {
			throw new Error('Cannot persist properties when localStorage is not available!');
		}
		switch (valueType) {
			case "boolean":
				descriptor.get = function() {
					return localStorage.getItem(propertyName) != null ? Boolean(localStorage.getItem(propertyName)):defaultValue;
				};
				descriptor.set = function(value) {
					localStorage.setItem(propertyName,value);
				}
				break;
			case "number":
				descriptor.get = function() {
					var result = parseInt(localStorage.getItem(propertyName));
					return !isNaN(result) ? result : defaultValue;
				};
				descriptor.set = function(value) {
					localStorage.setItem(propertyName,value);
				}
				break;
			case "string":
				descriptor.get = function() {
					return localStorage.getItem(propertyName) != null ? localStorage.getItem(propertyName) : defaultValue;
				};
				descriptor.set = function(value) {
					localStorage.setItem(propertyName,value);
				}
				break;
			case "object":
				descriptor.get = function() {
					return localStorage.getItem(propertyName) != null ? JSON.parse(localStorage.getItem(propertyName)) : defaultValue;
				};
				descriptor.set = function(value) {
					localStorage.setItem(propertyName,JSON.stringify(value));
				}
				break;

			default:
        throw new Error('typeof ' + valueType + ' is not currently supported!');
				break;
		}
	} else {
		descriptor.value = defaultValue;
		descriptor.writable = true;
	}
	Object.defineProperty(this, propertyName,descriptor);
}


module.exports = smartpropertybag;
