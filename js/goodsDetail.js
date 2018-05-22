    $(function () {
        var pid = (GetQueryString("pid"));
        var tel = sessionStorage.getItem("mobile");
        var user = ' <p class="user">'+tel+'&nbsp;已登录</p>'
        $('#user').append(user);

        $('.find').click(function () {
            $('.wrong').show();
        });
        $('.close').click(function () {
            $('.wrong').hide();
            $('.prod').hide();
            $('.disease').hide();
        });
        $('#prod').click(function () {
            $('.prod').show();
        });
        $('#disease').click(function () {
            $('.disease').show();
        });

        $(document).on('click', '.mask', function () {
           var title = $(this).next().text();
            layer.tips('<p style="color:#222">' + title + '</p>', this, {
                tips: [1, '#f2f2f2'] ,//还可配置颜色
                area: ['400px']
            });
        });
        $('.nav_wrap a').click(function () {

            $(this).addClass('active').siblings().removeClass('active');
            $('.nav').hide();
            $('.list_nav').addClass('fixedNav');
            $('.compary').hide();
            $('.safe_info').hide();
            $('.safe').addClass('min_nav');
            $('#conten').addClass('list_conter');
        });
        $(document).on('scroll', function () {

            var $this = $(this);//得到导航对象
            var scrollTop = $this.scrollTop();
            if (scrollTop >= 100) {
                $('.nav').hide();
                $('.list_nav').addClass('fixedNav');
                $('.compary').hide();
                $('.safe_info').hide();
                $('.safe').addClass('min_nav');
                $('#conten').addClass('list_conter');
                $('.wrap_layer').css({'margin': '50px auto 0'})
            } else {
                $('.nav').show();
                $('.list_nav').removeClass('fixedNav');
                $('.compary').show();
                $('.safe_info').show();
                $('.safe').removeClass('min_nav');
                $('#conten').removeClass('list_conter');
                $('.wrap_layer').css({'margin': '20px auto 0'})
            }

        });
        //内容信息导航锚点
        $('.nav_wrap').navScroll({
            mobileDropdown: true,
            mobileBreakpoint: 1024,
            scrollSpy: true
        });
       var collect = '';
        $(document).on('click', '#follow', function () {
           var t = $(this);
            if (collect == 0) {
                layer.confirm('确认关注？', {
                    btn: ['确定', '取消'] //按钮
                }, function () {

                   var url = '/users/add_followed_product';
                    $.post(url, {
                        pid: pid,
                        session_key: session_key
                    }, function (data, stauts) {

                        if (data.err_code == 0) {
                            layer.msg('关注成功', {icon: 1});
                            t.text('已关注');
                            collect = 1;
                        }

                    });

                });
            } else if (collect == 1) {
                layer.confirm('取消关注？', {
                    btn: ['确定', '取消'] //按钮
                }, function () {

                   var url = '/users/cancel_followed_product';
                    $.post(url, {
                        pid: pid,
                        session_key: session_key
                    }, function (data, stauts) {

                        if (data.err_code == 0) {
                            layer.msg('取消成功', {icon: 1});
                            t.text('关注');
                            collect = 0;
                        }

                    });

                });

            }

        });

        function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)return unescape(r[2]);
            return null;
        }


        var session_key = sessionStorage.getItem("session_key");


       var select = '';
       var selectChild = '';
        $(document).on('change', '.selectType', function () {
           var v = $(this).find("option:selected").val();

            selectChild = select[v]['benefit_payment_arr'];
            $('#benefit_type').text(select[v].benefit_type);
            $('#select_t').empty();

           var benefit_payment_arr_html = '';
            for (var i = 0; i <= selectChild.length - 1; i++) {
                benefit_payment_arr_html += '<option value="' + i + '">' + selectChild[i].name + '</option>';
            }
            $('#select_t').append(benefit_payment_arr_html);

 
            $('#payment_conditions').empty();
            $('#payment_ways').empty();
            var payment_conditions_html = '';
            for (var i = 0; i <= selectChild[0].payment_conditions.length - 1;  i++) {
                
                payment_conditions_html += '<p>'+selectChild[0].payment_conditions[i][0];

                if(selectChild[0].payment_conditions[i][2] != ''){
                payment_conditions_html += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + selectChild[0].payment_conditions[i][2] + '</span>';
                }
                payment_conditions_html += '<span>'+selectChild[0].payment_conditions[i][1]+'</span></p>';
            };
            $('#payment_conditions').append(payment_conditions_html);

             var payment_ways_html = '';
            for (var  i = 0; i <= selectChild[0].payment_ways.length - 1; i++) {
                
                payment_ways_html += '<p>'+selectChild[0].payment_ways[i][0];

                if(selectChild[0].payment_ways[i][2] != ''){
                payment_ways_html += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + selectChild[0].payment_conditions[i][2] + '</span>';
                }
                payment_ways_html += '<span>'+selectChild[0].payment_ways[i][1]+'</span></p>';
            };
            $('#payment_ways').append(payment_ways_html);


        });


        $(document).on('change', '.selectTypeChild', function () {
           var v = $(this).find("option:selected").val();

            $('#payment_conditions').empty();
            $('#payment_ways').empty();
             var payment_conditions_html = '';
            for (var i = 0; i <= selectChild[v].payment_conditions.length - 1;  i++) {
                
                payment_conditions_html += '<p>'+selectChild[v].payment_conditions[i][0];

                if(selectChild[v].payment_conditions[i][2] != ''){
                payment_conditions_html += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + selectChild[v].payment_conditions[i][2] + '</span>';
                }
                payment_conditions_html += '<span>'+selectChild[v].payment_conditions[i][1]+'</span></p>';
            };
            $('#payment_conditions').append(payment_conditions_html);

             var payment_ways_html = '';
            for (var i = 0; i <= selectChild[v].payment_ways.length - 1; i++) {
                
                payment_ways_html += '<p>'+selectChild[v].payment_ways[i][0];

                if(selectChild[v].payment_ways[i][2] != ''){
                payment_ways_html += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + selectChild[v].payment_conditions[i][2] + '</span>';
                }
                payment_ways_html += '<span>'+selectChild[v].payment_ways[i][1]+'</span></p>';
            };
            $('#payment_ways').append(payment_ways_html);


        });
        //投连险
        var investment = '';
        $(document).on('change', '.selectInvested', function () {
           var v = $(this).find("option:selected").val();
            $('#invested').append(universal);
            $('#asset_class').text(investment[v].asset_class[1]);
            if(investment[v].benchmark[2] == ''){
                $('#mask3').hide();
            }else{
                $('#benchmark_tps').text(investment[v].benchmark[2]);
            }

            $('#benchmark').text(investment[v].benchmark[1]);
            $('#bid_ask_spread').text(investment[v].bid_ask_spread[1]);
            $('#sell_price').text(investment[v].sell_price[1]);
            $('#sell_date').text(investment[v].sell_date[1]);
            $('#investment_management_fee').text(investment[v].investment_management_fee[1]);
            if(investment[v].investment_management_fee[2] == ''){
                $('#mask4').hide();
            }else{
                $('#investment_management_fee_tps').text(investment[v].investment_management_fee[2]);
            }

            $('#avg_volatility_3y').text(investment[v].avg_volatility_3y[1]);
            $('#avg_return_3y').text(investment[v].avg_return_3y[1]);
            //历年表现
           var history_performance = '';
            console.log(investment[v].history_performance);
            for (var i = 0; i <= investment[v].history_performance.length - 1; i++) {
                history_performance += '<p>' + investment[v].history_performance[i][0] + '<span>' + investment[v].history_performance[i][1] + '</span></p>'
            }
            $('#history_performance').empty();
            $('#history_performance').append(history_performance);
            var benchmark_value = investment[v].benchmark_value;
            var time_line = investment[v].time_line;
            var name= investment[v].name;
            var investment_value = investment[v].investment_value;
            var benchmark = investment[v].benchmark[1];
            var chart1 = Highcharts.chart('container', {
                chart: {
                    panKey: 'shift'
                },
                legend:{
                    verticalAlign: 'bottom',
                },
                xAxis: {
                    tickInterval: 5,
                    categories: time_line
                },
                title: {
                    text: null
                },
                yAxis: {
                    min: 0,
                    step:0.5,
                    labels: {
                        formatter: function () {
                            return this.value;
                        },

                    },
                    title:{
                        text:null
                    }
                },
                series: [{
                    name: name,
                    color: "rgb(113,158,50)",
                    data: investment_value,
                    lineWidth: 3,
                    marker: {
                        enabled: false,
                    }
                },{
                    name: benchmark,
                    data:benchmark_value,
                    color:"rgb(124,181,236)",
                    lineWidth: 3,
                    marker: {
                    enabled: false,
                }
                }]
            });
        });

        function getList() {
           var url = '/terms/wbzx_get_product_detail_info';
           var post_data = {
                pid: pid,
                session_key: session_key,
                timestamp: Date.parse(new Date()) / 1000
           };
           post_data['sign'] = complete_digest(post_data);
            $.post(url, post_data, function (data, stauts) {
                if (data.err_msg == 'INVALID_SESSION_KEY') {
                    layer.confirm('请先登录？', {
                        btn: ['确定', '取消'] //按钮
                    }, function () {

                        window.location = 'login.html';

                    });
                } else if (data.err_msg == 'TOO_MANY_REQUESTS') {
                    alert('请求过于密集，请稍后再试');
                } else {
                    collect = data.product_info_json.is_followed;//关注

                    var product = data.product_info_json.product;
                    var company = data.product_info_json.insurer_info;//公司信息
                    var ability = data.product_info_json.insurer_solvency_info;//赔付能力
                    var strategically = data.product_info_json.insurer_market_ranking_info;//市场地位
                    var loan = data.product_info_json.insurance_loan_info;//保单贷款
                    var initial_fee = data.product_info_json.insurance_fee_info;//保单费用
                    var benefit_claim_info = data.product_info_json.benefit_claim_info;//理赔
                    var insurance_cancellation_info = data.product_info_json.insurance_cancellation_info;//退保
                    var insurance_info = data.product_info_json.insurance_info;//投保信息
                    select = data.product_info_json.benefit_arr;//保障
                    var dividend = data.product_info_json.dividend_info;//分红方式
                    investment = data.product_info_json.investment_info;//投资

                   var collected = '';
                    if (data.product_info_json.is_followed == 0) {
                        collected = '关注';
                    } else {
                        collected = '已关注';
                    }
                    $('#follow').text(collected);
                    if (data.product_info_json.investment_flag == 0) {//0为无理财信息
                        $('#investment').hide();
                    }

                    if (data.product_info_json.investment_flag == 1) {//1为投连
                        $('#universal').hide();
                        $('#title').text('投资');
                       var universal = '';
                        for (var i = 0; i <= investment.length - 1; i++) {
                            universal += '<option value="' + i + '">' + investment[i].name + '</option>';
                        }
                        $('#invested').append(universal);
                        $('#asset_class').text(investment[0].asset_class[1]);
                        if(investment[0].benchmark[2] == ''){
                            $('#mask3').hide();
                        }else{
                            $('#benchmark_tps').text(investment[0].benchmark[2]);
                        }
                        $('#benchmark').text(investment[0].benchmark[1]);
                        $('#bid_ask_spread').text(investment[0].bid_ask_spread[1]);
                        $('#sell_price').text(investment[0].sell_price[1]);
                        $('#sell_date').text(investment[0].sell_date[1]);
                        $('#investment_management_fee').text(investment[0].investment_management_fee[1]);
                        if(investment[0].investment_management_fee[2] == ''){
                            $('#mask4').hide();
                        }else{
                            $('#investment_management_fee_tps').text(investment[0].investment_management_fee[2]);
                        }
                        $('#avg_volatility_3y').text(investment[0].avg_volatility_3y[1]);
                        $('#avg_return_3y').text(investment[0].avg_return_3y[1]);
                        //历年表现
                       var history_performance = '';
                        for (var i = 0; i <= investment[0].history_performance.length - 1; i++) {
                            history_performance += '<p>' + investment[0].history_performance[i][0] + '<span>' + investment[0].history_performance[i][1] + '</span></p>'
                        }
                        $('#history_performance').append(history_performance);
                        var benchmark_value = investment[0].benchmark_value;
                        var time_line = investment[0].time_line;
                        var investment_value = investment[0].investment_value
                        var name= investment[0].name;
                        var benchmark = investment[0].benchmark[1];
                        var chart1 = Highcharts.chart('container', {
                            chart: {
                                panKey: 'shift'
                            },
                            legend:{
                                verticalAlign: 'bottom',
                            },
                            xAxis: {
                                tickInterval: 5,
                                categories: time_line
                            },
                            title: {
                                text: null
                            },
                            yAxis: {
                                min: 0,
                                step:0.5,
                                labels: {
                                    formatter: function () {
                                        return this.value;
                                    },

                                },
                                title:{
                                    text:null
                                }
                            },
                            series: [{
                                name: name,
                                color: "rgb(113,158,50)",
                                data: investment_value,
                                lineWidth: 3,
                                marker: {
                                    enabled: false,
                                }
                            },{
                                name: benchmark,
                                data: benchmark_value,
                                color:"rgb(124,181,236)",
                                lineWidth: 3,
                                marker: {
                                enabled: false,
                            }}]
                        });


                    } else if (data.product_info_json.investment_flag == 2) {//2为万能
                        $('#invest').hide();
                        $('#title').text('理财');
                        $('#asset_class_text').text(investment.asset_class[1]);
                        $('#benchmark_text').text(investment.benchmark[1]);

                        if(investment.benchmark[2] == ''){
                            $('#mask3').hide();
                        }else{
                            $('#benchmark_text_tps').text(investment.benchmark[2]);
                        }
                        $('#yearly_settled_interest_rate').text(investment.yearly_settled_interest_rate[1]);
                        $('#settlement_date').text(investment.settlement_date[1]);
                        $('#3y_avg_settled_interest_rate').text(investment._3y_avg_settled_interest_rate[1]);
                        if(investment.min_settled_interest_rate[2] == ''){
                            $('#mask5').hide();
                        }else{
                            $('#min_settled_interest_rate_tps').text(investment.min_settled_interest_rate[2]);
                        }

                        $('#min_settled_interest_rate').text(investment.min_settled_interest_rate[1]);
                        //历年表现
                       var history_interest_rate = '';
                        for (var i = 0; i <= investment.history_interest_rate.length - 1; i++) {
                            history_interest_rate += '<p>' + investment.history_interest_rate[i][0] + '<span>' + investment.history_interest_rate[i][1] + '</span></p>'
                        }
                        $('#history_interest_rate').after(history_interest_rate);
                        var str = investment.universal_value;
                        var strs = new Array();
                        for(var i = 0;i<str.length;i++){
                            strs.push(parseFloat(str[i][0]));
                        }
                        var benchmark_value = investment.benchmark_value;
                        var benchmarkValue = new Array();
                        for(var i = 0;i<benchmark_value.length;i++){
                            benchmarkValue.push(parseFloat(benchmark_value[i]));
                        }

                        console.log(strs);
                        var time_line = investment.time_line;
                        var name = investment.name;
                        var benchmark = investment.benchmark[1];
                        var chart2 = Highcharts.chart('container2', {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text:null
                            },
                            xAxis: {

                                crosshair: true,
                                categories: time_line,
                            },
                            yAxis:{
                                step:0.5,
                                title:{
                                    text:null
                                }
                            },
                            series: [{
                                name: name,
                                color: "rgb(113,158,50)",
                                data: strs,
                                lineWidth: 5,
                                tooltip: {
                                    valueSuffix: ' %'
                                }
                            },{
                                name: benchmark,
                                color: "rgb(124,181,236)",
                                data: benchmarkValue,
                                lineWidth: 5,
                                tooltip: {
                                    valueSuffix: ' %'
                                }
                            }]
                        });

                    }

                    var selected = '';
                    selectChild = select[0]['benefit_payment_arr'];
                    for (var i = 0; i <= select.length - 1; i++) {
                        selected += '<option value="' + i + '">' + select[i].benefit_name + '</option>';
                    }
                    $('#select').append(selected);

                   var benefit_payment_arr_html = '';
                    for (var i = 0; i <= select[0]['benefit_payment_arr'].length - 1; i++) {

                        benefit_payment_arr_html += '<option value="' + i + '">' + select[0]['benefit_payment_arr'][i].name + '</option>';
                    }
                    $('#select_t').append(benefit_payment_arr_html);


                    //zuo bian
                    
                    var payment_conditions_html = '';
                    for (var i = 0; i <= selectChild[0].payment_conditions.length - 1;  i++) {
                        
                        payment_conditions_html += '<p>'+selectChild[0].payment_conditions[i][0];

                        if(selectChild[0].payment_conditions[i][2] != ''){
                        payment_conditions_html += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + selectChild[0].payment_conditions[i][2] + '</span>';
                        }
                        payment_conditions_html += '<span>'+selectChild[0].payment_conditions[i][1]+'</span></p>';
                    };
                    $('#payment_conditions').append(payment_conditions_html);
                    $('#benefit_type').text(select[0].benefit_type);
                     var payment_ways_html = '';
                    for (var i = 0; i <= selectChild[0].payment_ways.length - 1;  i++) {
                        
                        payment_ways_html += '<p>'+selectChild[0].payment_ways[i][0];

                        if(selectChild[0].payment_ways[i][2] != ''){
                        payment_ways_html += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + selectChild[0].payment_conditions[i][2] + '</span>';
                        }
                        payment_ways_html += '<span>'+selectChild[0].payment_ways[i][1]+'</span></p>';
                    };
                    $('#payment_ways').append(payment_ways_html);






                    localStorage.setItem("html_link", data.product_info_json.html_link);

                    $('.des').text(company.insurer_introduction);
                    $('.safe').text(product);
                    var insurer_logo = '<img class="ins_logo" src="' + company.insurer_logo + '">';
                    $('.compary').append(insurer_logo);
                    var safe_info = '';
                    safe_info += '<ul><li><p>保险公司简称</p><p>' + company.insurer_name_abbr + '</p></li>' +
                        '<li><p>产品类型</p><p>' + data.product_info_json.product_class + '</p></li>' +
                        '<li><p>产品结构</p><p>' + data.product_info_json.product_structure + '</p></li>' +
                        '<li><p>备案年份</p><p>' + data.product_info_json.filing_year + '</p></li>' +
                        '<li><p>销售状态</p><p>' + data.product_info_json.sale_available + '</p></li>' +
                        '</ul>'
                    $('.safe_info').append(safe_info);
                    //保险公司
                    $('#company').text(company.insurer_name);
                    var info_html = '';
                    info_html += '<p>' + company.capital_nationality[0] ;
                    if(company.capital_nationality[2] != ''){
                        info_html += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + company.capital_nationality[2] + '</span>';
                    }
                    info_html += '<span>'+company.capital_nationality[1]+'</span></p>' ;
                    info_html +=  ' <p>' + company.is_listed[0];
                    if(company.is_listed[2] != ''){
                        info_html += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + company.is_listed[2] + '</span>';
                    }
                    info_html +='<span>' + company.is_listed[1] + '</span></p>' ;
                    info_html += '<p>' + company.established_date[0] ;
                    if(company.established_date[2] != ''){
                        info_html += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + company.established_date[2] + '</span>';
                    }
                    info_html +='<span>' + company.established_date[1] + '</span></p>';

                    $('#info').append(info_html);
                    var info_text = '';
                    info_text += '<p>' + company.website[0] ;
                    if(company.website[2] != ''){
                        info_text += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + company.website[2] + '</span>';
                    }
                    info_text +='<span><a href="http://'+company.website[1]+'" target="_blank" style="color:#333">' + company.website[1] + '</a></span></p>' ;
                    info_text += ' <p>' + company.hotline[0] ;
                    if(company.hotline[2] != ''){
                        info_text += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + company.hotline[2] + '</span>';
                    }
                    info_text +='<span>' + company.hotline[1] + '</span></p>' ;
                    info_text += '<p>' + company.head_quarter[0] ;
                    if(company.head_quarter[2] != ''){
                        info_text += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + company.head_quarter[2] + '</span>';
                    }
                    info_text += '<span>' + company.head_quarter[1] + '</span></p>';
                    $('#info_text').append(info_text);

                    //分红
                    var dividend_info = '';
                    if(dividend.dividend_way[1] != '--'){
                        dividend_info += '<p>' + dividend.dividend_way[0] ;
                        if(dividend.dividend_way[2] != ''){
                            dividend_info +=  '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + dividend.dividend_way[2] + '</span>';
                        }
                        dividend_info += '<span>'+dividend.dividend_way[1]+'</span></p>';
                    }
                    if(dividend.dividend_cycle[1] != '--'){
                        dividend_info += '<p>' + dividend.dividend_cycle[0] ;
                        if(dividend.dividend_cycle[2] != ''){
                            dividend_info +=  '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + dividend.dividend_cycle[2] + '</span>';
                        }
                        dividend_info += '<span>' + dividend.dividend_cycle[1] + '</span></p>';
                    }
                    if(dividend_info != ''){
                        $('#dividend').after(dividend_info);
                    }else{
                        $('#fenhong').css('display','none');
                    }


                    //赔付能力
                    var solvency = '';
                    solvency += '<p>' + ability.core_solvency_adequacy_ratio[0];
                    if(ability.core_solvency_adequacy_ratio[2]  != ''){
                        solvency +='<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + ability.core_solvency_adequacy_ratio[2] + '</span>';
                    }
                    solvency +='<span>'+ability.core_solvency_adequacy_ratio[1]+'</span></p>' ;
                    solvency += '<p>' + ability.comprehansive_solvency_adequacy_ratio[0] ;
                    if(ability.comprehansive_solvency_adequacy_ratio[2]  != ''){
                        solvency +='<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + ability.comprehansive_solvency_adequacy_ratio[2] + '</span>';
                    }
                    solvency +='<span>' + ability.comprehansive_solvency_adequacy_ratio[1] + '</span></p>' ;
                    solvency += '<p>' + ability.solvency_rating[0] ;
                    if(ability.solvency_rating[2]  != ''){
                        solvency +='<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + ability.solvency_rating[2] + '</span>';
                    }
                    solvency +='<span>' + ability.solvency_rating[1] + '</span></p>';
                    $('#ability').after(solvency);

                    //市场地位
                    var market = '';
                    $('#year').text(strategically.insurer_market_ranking_year);
                    market += '<p>' + strategically.original_insurance_premium_income[0] ;
                    if(strategically.original_insurance_premium_income[2] != ''){
                        market +=  '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + strategically.original_insurance_premium_income[2] + '</span>';
                    }
                    market += '<span>'+strategically.original_insurance_premium_income[1]+'</span></p>' ;
                    market += '<p>' + strategically.investment_new_premium[0] ;
                    if(strategically.investment_new_premium[2] != ''){
                        market +=  '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + strategically.investment_new_premium[2] + '</span>';
                    }
                    market +='<span>' + strategically.investment_new_premium[1] + '</span></p>' ;
                    market +='<p>' + strategically.investment_link_account_new_premium[0] ;
                    if(strategically.investment_link_account_new_premium[2] != ''){
                        market +=  '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + strategically.investment_link_account_new_premium[2] + '</span>';
                    }
                    market +='<span>' + strategically.investment_link_account_new_premium[1] + '</span></p>' ;
                    market += '<p>' + strategically.original_insurance_premium_income_ranking[0] ;
                    if(strategically.original_insurance_premium_income_ranking[2] != ''){
                        market +=  '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + strategically.original_insurance_premium_income_ranking[2] + '</span>';
                    }
                    market += '<span>' + strategically.original_insurance_premium_income_ranking[1] + '</span></p>' ;
                    market += '<p>' + strategically.original_insurance_premium_income_market_share[0] ;
                    if(strategically.original_insurance_premium_income_market_share[2] != ''){
                        market +=  '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + strategically.original_insurance_premium_income_market_share[2] + '</span>';
                    }
                    market += '<span>' + strategically.original_insurance_premium_income_market_share[1] + '</span></p>';
                    $('#strategically').after(market);

                    //保单贷款
                    var loan_text = '';
                    if(loan.loan_period[1] != '--'){
                        loan_text += '<p>' + loan.loan_period[0] ;
                        if(loan.loan_period[2] != ''){
                            loan_text +=  '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + loan.loan_period[2] + '</span>';
                        }
                        loan_text +='<span>' + loan.loan_period[1] + '</span></p>' ;
                    }
                    if(loan.loan_amount[1] != '--'){
                        loan_text +=' <p>' + loan.loan_amount[0] ;
                        if(loan.loan_amount[2] != ''){
                            loan_text +=  '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + loan.loan_amount[2] + '</span>';
                        }
                        loan_text += '<span>' + loan.loan_amount[1] + '</span></p>' ;
                    }
                    if(loan.loan_interest_rate[1] != '--'){
                        loan_text += '<p>' + loan.loan_interest_rate[0] ;
                        if(loan.loan_interest_rate[2] != ''){
                            loan_text +=  '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + loan.loan_interest_rate[2] + '</span>';
                        }
                        loan_text += '<span>' + loan.loan_interest_rate[1] + '</span></p>';
                    }
                   if(loan_text != ''){
                       $('#loan').after(loan_text);
                   }else{
                       $('#daik').css('display','none');
                   }


                    //保单费用
                    var initial_fee_html = '';
                    if(initial_fee.insurance_cancellation_fee[1] != '--'){
                        initial_fee_html += '<p>' + initial_fee.insurance_cancellation_fee[0]
                        if(initial_fee.insurance_cancellation_fee[2] != ''){
                            initial_fee_html += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + initial_fee.insurance_cancellation_fee[2] + '</span>';
                        }
                        initial_fee_html +='<span>'+initial_fee.insurance_cancellation_fee[1]+'</span></p>' ;
                    }
                    if(initial_fee.initial_fee[1] != '--'){
                        initial_fee_html += ' <p>' + initial_fee.initial_fee[0];
                        if(initial_fee.initial_fee[2] != ''){
                            initial_fee_html += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + initial_fee.initial_fee[2] + '</span>';
                        }
                        initial_fee_html +='<span>' + initial_fee.initial_fee[1] + '</span></p>' ;
                    }

                    if(initial_fee.insurance_management_fee[1] != '--'){
                        initial_fee_html += '<p>' + initial_fee.insurance_management_fee[0] ;
                        if(initial_fee.insurance_management_fee[2] != ''){
                            initial_fee_html += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + initial_fee.insurance_management_fee[2] + '</span>';
                        }
                        initial_fee_html +='<span>' + initial_fee.insurance_management_fee[1] + '/月</span></p>';
                    }
                    if(initial_fee_html != ''){
                        $('#initial_fee').after(initial_fee_html);
                    }else{
                        $('#feiy').css('display','none');
                    }

                    //理赔
                    var benefit_claim = '';
                    if(benefit_claim_info.acc_notify_period[1] != '--'){
                        benefit_claim += '<p>' + benefit_claim_info.acc_notify_period[0] ;
                        if(benefit_claim_info.acc_notify_period[2] != ''){
                            benefit_claim +='<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + benefit_claim_info.acc_notify_period[2] + '</span>';
                        }
                        benefit_claim +='<span>'+benefit_claim_info.acc_notify_period[1]+'</span></p>' ;
                    }

                    if(benefit_claim_info.benefit_approval_period[1] != '--'){
                        benefit_claim += '<p>' + benefit_claim_info.benefit_approval_period[0] ;
                        if(benefit_claim_info.benefit_approval_period[2] != ''){
                            benefit_claim +='<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + benefit_claim_info.benefit_approval_period[2] + '</span>';
                        }
                        benefit_claim +='<span>' + benefit_claim_info.benefit_approval_period[1] + '</span></p>';
                    }
                    if(benefit_claim_info.benefit_delivered_period[1] != '--'){
                        benefit_claim +=' <p>' + benefit_claim_info.benefit_delivered_period[0] ;
                        if(benefit_claim_info.benefit_delivered_period[2] != ''){
                            benefit_claim +='<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + benefit_claim_info.benefit_delivered_period[2] + '</span>';
                        }
                        benefit_claim +='<span>' + benefit_claim_info.benefit_delivered_period[1] + '</span></p>' ;
                    }
                    if(benefit_claim != ''){
                        $('#benefit_claim_info').after(benefit_claim);
                    }else{
                        $('#lipei').css('display','none');
                    }

                    //退保
                    var insurance_cancellation = '';
                    if(insurance_cancellation_info.cooling_off_period[1] != '--'){
                        insurance_cancellation += '<p>' + insurance_cancellation_info.cooling_off_period[0] ;
                        if(insurance_cancellation_info.cooling_off_period[2] != ''){
                            insurance_cancellation +='<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + insurance_cancellation_info.cooling_off_period[2] + '</span>';
                        }
                        insurance_cancellation +='<span>' + insurance_cancellation_info.cooling_off_period[1] + '</span></p>' ;
                    }
                    if(insurance_cancellation_info.insurance_cancellation_period[1] != '--'){
                        insurance_cancellation +=' <p>' + insurance_cancellation_info.insurance_cancellation_period[0] ;
                        if(insurance_cancellation_info.insurance_cancellation_period[2] != ''){
                            insurance_cancellation +='<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + insurance_cancellation_info.insurance_cancellation_period[2] + '</span>';
                        }
                        insurance_cancellation +='<span>' + insurance_cancellation_info.insurance_cancellation_period[1] + '</span></p>';
                    }
                   if(insurance_cancellation != ''){
                       $('#insurance_cancellation').after(insurance_cancellation);
                   }else{
                       $('#tuibao').css('display','none');
                   }

                    //投保信息
                    var insurance_info_html = '';
                    insurance_info_html += '<p>' + insurance_info.target_audience[0];
                    if(insurance_info.target_audience[2] != ''){
                        insurance_info_html +='<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + insurance_info.target_audience[2] + '</span>';
                    }
                    insurance_info_html += '<span>' + insurance_info.target_audience[1] + '</span></p>'
                    insurance_info_html +=  ' <p>' + insurance_info.policy_period[0];
                    if(insurance_info.policy_period[2] != ''){
                        insurance_info_html +='<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + insurance_info.policy_period[2] + '</span>';
                    }
                    insurance_info_html +='<span>' + insurance_info.policy_period[1] + '</span></p>' ;
                    insurance_info_html +=  '<p>' + insurance_info.extra_insurance[0] ;
                    if(insurance_info.extra_insurance[2] != ''){
                        insurance_info_html +='<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + insurance_info.extra_insurance[2] + '</span>';
                    }
                    insurance_info_html +='<span>' + insurance_info.extra_insurance[1] + '</span></p>';
                    $('#insurance_info').append(insurance_info_html);

                    var extra_insurance_html = '';
                    extra_insurance_html += '<p>' + insurance_info.insurance_age_coverage[0];
                    if(insurance_info.insurance_age_coverage[2] != ''){
                        extra_insurance_html += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + insurance_info.insurance_age_coverage[2] + '</span>';
                    }
                    extra_insurance_html += '<span>' + insurance_info.insurance_age_coverage[1] + '</span></p>' ;
                    extra_insurance_html += '<p>' + insurance_info.insurance_payment_info[0] ;
                    if(insurance_info.insurance_payment_info[2] != ''){
                        extra_insurance_html += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + insurance_info.insurance_payment_info[2] + '</span>';
                    }
                    extra_insurance_html += '<span>' + insurance_info.insurance_payment_info[1] + '</span></p>' ;
                    extra_insurance_html += '<p>' + insurance_info.insurance_grace_period[0] ;
                    if(insurance_info.insurance_grace_period[2] != ''){
                        extra_insurance_html += '<img src="http://p86qgj9gq.bkt.clouddn.com/info.png?v=1" class="mask"><span style="display: none">' + insurance_info.insurance_grace_period[2] + '</span>';
                    }

                    extra_insurance_html += '<span>' + insurance_info.insurance_grace_period[1] + '</span></p>';
                    $('#extra_insurance').append(extra_insurance_html);
                }


            })
        }

        getList();

        //发现错误
        $('.confirm').click(function () {
            var obj = document.getElementsByName('test'); //选择所有name="'test'"的对象，返回数组
//取到对象数组后，我们来循环检测它是不是被选中
           var bug_type = '';
           var bug_detail = $('#bug_detail').val();
           var url = '/terms/wbzx_product_bug_report';
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].checked)
                    bug_type += obj[i].value + '+'; //如果选中，将value添加到变量s中
            }
            if (bug_type == '') {
                layer.msg('请选择问题标题！');
                return false;
            }
            if (bug_detail == '') {
                layer.msg('问题描述不能为空！');
                return false;
            }
            $.post(url,
                {
                    bug_type: bug_type,
                    bug_detail: bug_detail,
                    pid: pid,
                    session_key: session_key
                },
                function (data, status) {
                    if (data.err_code == 0) {
                        layer.msg('您的反馈已发送');

                    }

                });

        });


    })
