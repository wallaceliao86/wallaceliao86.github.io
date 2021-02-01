        // 性別
        var ctx = $('#genderChart');
        var genderChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                // '#0fb5e6', '#f48a81',
                labels: ['男性', '女性'],
                datasets: [{
                    data: [32, 68],
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
                legend: {
                    display: false
                },
                animation: {
                    animateScale: true
                }
            }
        });
        // 年齡
        var ctx = $('#oldChart');
        var oldChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                // '#0fb5e6', '#f48a81',
                labels: ['(20歲以下)', '(21-25歲)', '(26-30歲)', '(31-35歲)', '(36-40歲)', '(41-45歲)', '(46-50歲)', '(50歲以上)'],
                datasets: [{
                    data: [1, 10, 26, 23, 21, 5, 9, 5],
                    backgroundColor: [
                        // 73bf43,097b75,18b04a,5ec4bb,107039,12a79b,73bf43,097b75,
                        'rgba(115, 191, 67, 0.6)',
                        'rgba(9, 123, 117, 0.6)',
                        'rgba(24, 176, 74, 0.6)',
                        'rgba(94, 196, 187, 0.6)',
                        'rgba(16, 112, 57, 0.6)',
                        'rgba(18, 167, 155, 0.6)',
                        'rgba(115, 191, 67, 0.6)',
                        'rgba(9, 123, 117, 0.6)'
                    ],
                    borderColor: [
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(0, 0, 0, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        'rgba(115, 191, 67, 1)',
                        'rgba(9, 123, 117, 1)',
                        'rgba(24, 176, 74, 1)',
                        'rgba(94, 196, 187, 1)',
                        'rgba(16, 112, 57, 1)',
                        'rgba(18, 167, 155, 1)',
                        'rgba(115, 191, 67, 1)',
                        'rgba(9, 123, 117, 1)'
                    ]
                }],
            },
            options: {
                legend: {
                    display: false
                },
                animation: {
                    animateScale: true
                }
            }
        });
        // 職業分佈
        var ctx = $('#jobChart');
        var jobChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                // '#faab18', '#4998d2', '#949291','#73bf43','#ed4699'
                labels: ['服務', '業務', '其他', '教育', '醫療照護'],
                datasets: [{
                    data: [26, 14, 20, 15, 25],
                    backgroundColor: [
                        'rgba(250, 171, 24, 0.6)',
                        'rgba(73,152,210,0.6)',
                        'rgba(148,146,145,0.6)',
                        'rgba(115,191,67,0.6)',
                        'rgba(237,70,153,0.6)'
                    ],
                    borderColor: [
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(0, 0, 0, 0.2)',
                        'rgba(0, 0, 0, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        'rgba(250, 171, 24, 1)',
                        'rgba(73,152,210,1)',
                        'rgba(148,146,145,1)',
                        'rgba(115,191,67,1)',
                        'rgba(237,70,153,1)'
                    ]
                }],
            },
            options: {
                legend: {
                    display: false
                },
                animation: {
                    animateScale: true
                }
            }
        });

        // 結果迴歸圖
        var ctx = $('#resultLine');
        var resultLine = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['', '低', '高', ''],
                datasets: [{
                    data: [, 3.034, 3.416, ],
                    fill: false,
                    backgroundColor: 'rgba(75,171,197,1)',
                    borderColor: 'rgba(75,171,197,1)'
                }]
            },
            options: {
                layout: {
                    padding: {
                        left: 50,
                        right: 75,
                        top: 50,
                        bottom: 15
                    }
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            type: 'category',
                            labels: ['低', '高'],
                            display: true,
                            labelString: '工作負向對待',
                            fontColor: '#fff',
                            fontSize: 18
                        },
                        gridLines: {
                            zeroLineColor: 'rgba(255,255,255,1)',
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            fontSize: 18
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: '工作倦怠',
                            fontColor: '#fff',
                            fontSize: 18
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            display: true,
                            max: 4,
                            min: 2,
                            stepSize: 1,
                            fontSize: 18
                        },
                        gridLines: {
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
                        }
                    }]
                }
            }
        });
        // 職業認同
        var ctx = $('#cha_identity');
        var cha_identity = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['', '低', '高', ''],
                datasets: [{
                    label: '對職業的認同低',
                    data: [, 2.911, 3.545, ],
                    fill: false,
                    backgroundColor: 'rgba(75,171,197,1)',
                    borderColor: 'rgba(75,171,197,1)'
                }, {
                    label: '對職業的認同高',
                    borderDash: [8, 10],
                    data: [, 3.137, 3.355, ],
                    fill: false,
                    backgroundColor: 'rgba(183,222,232,1)',
                    borderColor: 'rgba(183,222,232,1)'
                }]
            },
            options: {
                layout: {
                    padding: {
                        left: 50,
                        right: 75,
                        top: 50,
                        bottom: 15
                    }
                },
                legend: {
                    labels: {
                        fontColor: '#fff'
                    }
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            type: 'category',
                            labels: ['低', '高'],
                            display: true,
                            labelString: '工作負向對待',
                            fontColor: '#fff',
                            fontSize: 18
                        },
                        gridLines: {
                            zeroLineColor: 'rgba(255,255,255,1)',
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            fontSize: 18
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: '工作倦怠',
                            fontColor: '#fff',
                            fontSize: 18
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            display: true,
                            max: 4,
                            min: 2,
                            stepSize: 1,
                            fontSize: 18
                        },
                        gridLines: {
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
                        }
                    }]
                }
            }
        });
        // 內在動機
        var ctx = $('#cha_in_motive');
        var cha_in_motive = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['', '低', '高', ''],
                datasets: [{
                    label: '工作的內在動機低',
                    data: [, 2.856, 3.489, ],
                    fill: false,
                    backgroundColor: 'rgba(75,171,197,1)',
                    borderColor: 'rgba(75,171,197,1)'
                }, {
                    label: '工作的內在動機高',
                    borderDash: [8, 10],
                    data: [, 3.190, 3.421, ],
                    fill: false,
                    backgroundColor: 'rgba(183,222,232,1)',
                    borderColor: 'rgba(183,222,232,1)'
                }]
            },
            options: {
                layout: {
                    padding: {
                        left: 50,
                        right: 75,
                        top: 50,
                        bottom: 15
                    }
                },
                legend: {
                    labels: {
                        fontColor: '#fff'
                    }
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            type: 'category',
                            labels: ['低', '高'],
                            display: true,
                            labelString: '工作負向對待',
                            fontColor: '#fff',
                            fontSize: 18
                        },
                        gridLines: {
                            zeroLineColor: 'rgba(255,255,255,1)',
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            fontSize: 18
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: '工作倦怠',
                            fontColor: '#fff',
                            fontSize: 18
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            display: true,
                            max: 4,
                            min: 2,
                            stepSize: 1,
                            fontSize: 18
                        },
                        gridLines: {
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
                        }
                    }]
                }
            }
        });
        // 工作自信
        var ctx = $('#cha_confidence');
        var cha_confidence = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['', '低', '高', ''],
                datasets: [{
                    label: '對工作的自信低',
                    data: [, 2.945, 3.521, ],
                    fill: false,
                    backgroundColor: 'rgba(75,171,197,1)',
                    borderColor: 'rgba(75,171,197,1)'
                }, {
                    label: '對工作的自信高',
                    borderDash: [8, 10],
                    data: [, 3.105, 3.386, ],
                    fill: false,
                    backgroundColor: 'rgba(183,222,232,1)',
                    borderColor: 'rgba(183,222,232,1)'
                }]
            },
            options: {
                layout: {
                    padding: {
                        left: 50,
                        right: 75,
                        top: 50,
                        bottom: 15
                    }
                },
                legend: {
                    labels: {
                        fontColor: '#fff'
                    }
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            type: 'category',
                            labels: ['低', '高'],
                            display: true,
                            labelString: '工作負向對待',
                            fontColor: '#fff',
                            fontSize: 18
                        },
                        gridLines: {
                            zeroLineColor: 'rgba(255,255,255,1)',
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            fontSize: 18
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: '工作倦怠',
                            fontColor: '#fff',
                            fontSize: 18
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            display: true,
                            max: 4,
                            min: 2,
                            stepSize: 1,
                            fontSize: 18
                        },
                        gridLines: {
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
                        }
                    }]
                }
            }
        });
        // 主管支持
        var ctx = $('#cha_super_support');
        var cha_super_support = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['', '低', '高', ''],
                datasets: [{
                    label: '主管給予工作上支持低',
                    data: [, 2.979, 3.545, ],
                    fill: false,
                    backgroundColor: 'rgba(75,171,197,1)',
                    borderColor: 'rgba(75,171,197,1)'
                }, {
                    label: '主管給予工作上支持高',
                    borderDash: [8, 10],
                    data: [, 3.079, 3.309, ],
                    fill: false,
                    backgroundColor: 'rgba(183,222,232,1)',
                    borderColor: 'rgba(183,222,232,1)'
                }]
            },
            options: {
                layout: {
                    padding: {
                        left: 50,
                        right: 75,
                        top: 50,
                        bottom: 15
                    }
                },
                legend: {
                    labels: {
                        fontColor: '#fff'
                    }
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            type: 'category',
                            labels: ['低', '高'],
                            display: true,
                            labelString: '工作負向對待',
                            fontColor: '#fff',
                            fontSize: 18
                        },
                        gridLines: {
                            zeroLineColor: 'rgba(255,255,255,1)',
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)']
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            fontSize: 18
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: '工作倦怠',
                            fontColor: '#fff',
                            fontSize: 18
                        },
                        ticks: {
                            fontColor: 'rgba(255,255,255,1)',
                            display: true,
                            max: 4,
                            min: 2,
                            stepSize: 1,
                            fontSize: 18
                        },
                        gridLines: {
                            color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
                        }
                    }]
                }
            }
        });