var BattleResult=function(){this.result="",this.playerLost=new Array,this.enemyLost=new Array},CompressRequest2=function(obj,zipped,compress,requestId){this.obj=obj,this.zipped=zipped,this.compress=compress,this.requestId=requestId},Ship=function(){function Ship(){this.armor=new Decimal,this.shield=new Decimal,this.modules=new Array,this.class="",this.isDefense=!1,this.armorReduction=new Decimal,this.shieldReduction=new Decimal,this.shieldCharger=new Decimal}return Ship.prototype.getCopy=function(){var ret=Ship.Ships.pop()||new Ship;return ret.id=this.id,ret.armor.fromDecimal(this.armor),ret.shield.fromDecimal(this.shield),ret.originalArmor=this.originalArmor,ret.originalShield=this.originalShield,ret.modules=this.modules,ret.explosionLevel=this.explosionLevel,ret.armorReduction=this.armorReduction,ret.shieldReduction=this.shieldReduction,ret.shieldCharger=this.shieldCharger,ret.class=this.class,ret},Ship.prototype.free=function(){Ship.Ships.push(this)},Ship.Ships=new Array,Ship}();function MyFromDecimal(obj){return void 0===obj&&(obj={}),"object"==typeof obj&&null!==obj&&"mantissa"in obj&&"exponent"in obj?Decimal.fromMantissaExponent(obj.mantissa,obj.exponent):new Decimal(obj)}!function(factory){if("object"==typeof module&&"object"==typeof module.exports){var v=factory(require,exports);void 0!==v&&(module.exports=v)}else"function"==typeof define&&define.amd&&define(["require","exports"],factory)}(function(require,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MyFromDecimal=function(obj){return void 0===obj&&(obj={}),"object"==typeof obj&&null!==obj&&"mantissa"in obj&&"exponent"in obj?Decimal.fromMantissaExponent(obj.mantissa,obj.exponent):new Decimal(obj)}});