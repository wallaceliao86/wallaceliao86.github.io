        // 部屬性別
        var ctx = $('#sub_genderChart');
        var sub_genderChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                // '#0fb5e6', '#f48a81',
                labels: ['男性', '女性'],
                datasets: [{
                    data: [52, 129],
                    backgroundColor: [
                        'rgba(15, 156, 210, 0.6)',
                        'rgba(220, 138, 90, 0.6)'
                    ],
                    borderColor: [
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(0, 0, 0, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        'rgba(15, 156, 210, 1)',
                        'rgba(220, 138, 90, 1)'
                    ]
                }],
            },
            options: {
                title: {
                    display: true,
                    text: '性別分佈',
                    position: 'bottom',
                    fontColor: '#fff'
                },
                legend: {
                    display: false
                },
                animation: {
                    animateScale: true
                }
            }
        });
        // 主管性別
        var ctx = $('#super_genderChart');
        var super_genderChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                // '#0fb5e6', '#f48a81',
                labels: ['男性', '女性'],
                datasets: [{
                    data: [95, 86],
                    backgroundColor: [
                        'rgba(15, 156, 210, 0.6)',
                        'rgba(220, 138, 90, 0.6)'
                    ],
                    borderColor: [
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(0, 0, 0, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        'rgba(15, 156, 210, 1)',
                        'rgba(220, 138, 90, 1)'
                    ]
                }],
            },
            options: {
                title: {
                    display: true,
                    text: '性別分佈',
                    position: 'bottom',
                    fontColor: '#fff'
                },
                legend: {
                    display: false
                },
                animation: {
                    animateScale: true
                }
            }
        });
        // 部屬年齡
        var ctx = $('#sub_ageChart');
        var sub_ageChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['', '25歲以下', '26歲~30歲', '31歲~35歲', '36歲~40歲', '41歲以上', ''],
                datasets: [{
                    data: [, 22, 44, 24, 28, 63, ],
                    fill: false,
                    backgroundColor: 'rgba(75,171,197,1)',
                    borderColor: 'rgba(75,171,197,1)'
                }]
            },
            options: {
                title: {
                    display: true,
                    text: '年齡分佈',
                    position: 'bottom',
                    fontColor: '#fff'
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            type: 'category',
                            labels: ['25歲以下', '26歲~30歲', '31歲~35歲', '36歲~40歲', '41歲以上'],
                            // display: true,
                            // labelString: '工作負向對待',
                            // fontColor: '#fff',
                            // fontSize: 18
                        },
                        gridLines: {
                            zeroLineColor: 'rgba(255,255,255,1)',
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            fontSize: 10
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            // display: true,
                            // labelString: '工作倦怠',
                            // fontColor: '#fff',
                            // fontSize: 18
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            display: true,
                            max: 96,
                            min: 0,
                            stepSize: 30,
                            fontSize: 10
                        },
                        gridLines: {
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
                        }
                    }]
                }
            }
        });
        // 主管年齡
        var ctx = $('#super_ageChart');
        var super_ageChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['', '25歲以下', '26歲~30歲', '31歲~35歲', '36歲~40歲', '41歲以上', ''],
                datasets: [{
                    data: [, 2, 13, 26, 27, 113, ],
                    fill: false,
                    backgroundColor: 'rgba(75,171,197,1)',
                    borderColor: 'rgba(75,171,197,1)'
                }]
            },
            options: {
                title: {
                    display: true,
                    text: '年齡分佈',
                    position: 'bottom',
                    fontColor: '#fff'
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            type: 'category',
                            labels: ['25歲以下', '26歲~30歲', '31歲~35歲', '36歲~40歲', '41歲以上'],
                            // display: true,
                            // labelString: '工作負向對待',
                            // fontColor: '#fff',
                            // fontSize: 18
                        },
                        gridLines: {
                            zeroLineColor: 'rgba(255,255,255,1)',
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            fontSize: 10
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            // display: true,
                            // labelString: '工作倦怠',
                            // fontColor: '#fff',
                            // fontSize: 18
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            display: true,
                            max: 120,
                            min: 0,
                            stepSize: 20,
                            fontSize: 10
                        },
                        gridLines: {
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']
                        }
                    }]
                }
            }
        });

        // 產業分布
        var ctx = $('#jobChart');
        var jobChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['科技電子業', '金融保險業', '服務業', '資訊傳播業', '運輸倉儲業', '一般製造業', '其他'],
                datasets: [{
                    data: [25, 11, 31, 11, 10, 41, 51],
                    fill: false,
                    backgroundColor: 'rgba(75,171,197,1)',
                    borderColor: 'rgba(75,171,197,1)'
                }]
            },
            options: {
                title: {
                    display: true,
                    text: '產業分佈',
                    position: 'bottom',
                    fontColor: '#fff'
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: 'rgba(255,255,255,1)',
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            fontSize: 10
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            // display: true,
                            // labelString: '工作倦怠',
                            // fontColor: '#fff',
                            // fontSize: 18
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            display: true,
                            max: 60,
                            min: 0,
                            stepSize: 20,
                            fontSize: 18
                        },
                        gridLines: {
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']
                        }
                    }]
                }
            }
        });

        // 散佈圖
        var ctx = $('#sca_');