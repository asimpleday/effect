layui.define(["form", "jquery"], function(exports){
    var form = layui.form,
        $ = layui.jquery;

    var Area = function(){
            this.config = {
                province: "",   // 省名称
                city: "",   // 市名称
                district: "",   // 区名称
                provinceCode: "",   // 省value
                cityCode: "",   // 市名称
                districtCode: ""   // 区名称
            }
            this.areaData = [];   // 省市区数据
            this.getAreaData = function(){   // 获取省市区数据
                var that = this;
                $.ajax({
                    url: "layuiadmin/json/areaData.json",
                    success: function(data){
                        that.areaData = data;
                        that.loadProvince();
                    }
                })
            },
            this.init = function(initConfig){
                this.config.province = initConfig.province;
                this.config.city = initConfig.city;
                this.config.district = initConfig.district;
                this.config.provinceCode = initConfig.provinceCode;
                this.config.cityCode = initConfig.cityCode;
                this.config.districtCode = initConfig.districtCode;
                this.getAreaData();  
            }
            this.appendOption = function($select, text, val, currentCode){   // 将option添加到select中
                var $option = $("<option>").text(text).val(val);
                if(currentCode == val){
                    $option.attr("selected", "selected");
                }
                $select.append($option);
            },
            this.loadProvince = function(){   // 加载省
                var that = this;
                $("select[id="+ that.config.province +"]").empty();
                that.appendOption($("select[id="+ that.config.province +"]"), "请选择省", "");
                $.each(that.areaData, function(k, v){
                    that.appendOption($("select[id="+ that.config.province +"]"), v.province, v.code, that.config.provinceCode);
                })
                form.on("select("+ that.config.province +")", function(data){
                    that.loadCity(data);
                })
                that.loadCity(that.config);
            },
            this.loadCity = function(data){   // 加载市
                var that = this;
                // 是否选了具体的省份
                if(data.value == ""){
                    that.config.provinceCode = "";
                }else{
                    that.config.provinceCode = data.value ? data.value : that.config.provinceCode;
                }
                $("select[id="+ that.config.city +"]").empty();
                that.appendOption($("select[id="+ that.config.city +"]"), "请选择市", "");
                $.each(that.areaData, function(k, v){
                    if(that.config.provinceCode == v.code){
                        $.each(v.citylist, function(k, v){
                            that.appendOption($("select[id="+ that.config.city +"]"), v.city, v.code, that.config.cityCode); 
                        })
                    }
                })
                form.on("select("+ that.config.city +")", function(data){
                    that.loadDistrict(data);
                })
                that.loadDistrict(that.config);
                
            },
            this.loadDistrict = function(data){   // 加载区
                var that = this;
                if(data.value == ""){
                    that.config.cityCode = "";
                }else{
                    that.config.cityCode = data.value ? data.value : that.config.cityCode;
                }
                $("select[id="+ that.config.district +"]").empty();
                that.appendOption($("select[id="+ that.config.district +"]"), "请选择县/区", "");
                
                $.each(that.areaData, function(k, v){
                    if(that.config.provinceCode == v.code){
                        $.each(v.citylist, function(k, v){
                            if(that.config.cityCode == v.code){
                                $.each(v.districtlist, function(k, v){
                                    that.appendOption($("select[id="+ that.config.district +"]"), v.district, v.code, that.config.districtCode);
                                })
                            }
                        })
                    }
                })
                form.render("select");
            }
    }
    exports("area", Area);
})