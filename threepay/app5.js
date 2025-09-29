//師生比資料
const teacherStudentRatioData = {
    "112": { local: 12.4, national: 25.4 },
    "111": { local: 12.6, national: 25.5 },
    "110": { local: 12.8, national: 25.6 },
    "109": { local: 13.0, national: 25.8 },
};

//教師流動率資料
const teacherTurnoverData = {
    "113": { 
        local: { elementary: 1.2, middle: 1.2, high: 0.5 },
        national: { elementary: null, middle: null, high: null } // 全國無資料
    },
    "112": { 
        local: { elementary: 1.21, middle: 1.21, high: 0.5 },
        national: { elementary: 1.06, middle: 0.7, high: 0.52 }
    },
    "111": { 
        local: { elementary: 1.61, middle: 1.26, high: 0.76 },
        national: { elementary: 1.42, middle: 0.6, high: 0.61 }
    },
    "110": { 
        local: { elementary: 1.7, middle: 1.15, high: 0.78 },
        national: { elementary: 1.13, middle: 0.66, high: 0.6 }
    },
    "109": { 
        local: { elementary: 1.48, middle: 1.21, high: 0.48 },
        national: { elementary: 1.03, middle: 0.74, high: 0.56 }
    }
};

//代理教師比率資料
const substituteTeacherData = {
    "111": { local: 25.84, national: 16.58 },
    "110": { local: 26.74, national: 16.43 },
    "109": { local: 23.62, national: 14.17 },
    "108": { local: 22.82, national: 14.48 },
};

const handleTeacherStudentRatio = () => {
    setSelectedData("teacherStudentRatio");
};

const handleTeacherTurnover = () => {
    setSelectedData("teacherTurnover");
};

const handleSubstituteTeacher = () => {
    setSelectedData("substituteTeacher");
};

//師生比Chart.js
useEffect(() => {
    if (selectedData !== "teacherStudentRatio") return;
    
    // 空值檢查
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) {
        chartInstance.current.destroy();
    }

    const labels = years.sort((a, b) => a - b); // 小到大
    const localData = labels.map(y => teacherStudentRatioData[y]?.local || 0);
    const nationalData = labels.map(y => teacherStudentRatioData[y]?.national || 0);

    const datasets = [
        {
            label: "偏鄉",
            data: localData,
            backgroundColor: "rgba(102, 126, 234, 0.7)",
            borderColor: "rgba(102, 126, 234, 1)",
            borderWidth: 2,
        }
    ];

    if (compare) {
        datasets.push({
            label: "全國",
            data: nationalData,
            backgroundColor: "rgba(255, 99, 132, 0.7)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
        });
    }

    chartInstance.current = new Chart(ctx, {
        type: chartType,
        data: {
            labels,
            datasets,
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: "white" }
                }
            },
            scales: {
                x: {
                    ticks: { color: "white" }
                },
                y: {
                    ticks: { color: "white" }
                }
            }
        }
    });
}, [years, chartType, compare, selectedData]);

//教師流動率Chart.js
useEffect(() => {
    if (selectedData !== "teacherTurnover") return;
    
    // 空值檢查
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) {
        chartInstance.current.destroy();
    }

    const labels = years.sort((a, b) => a - b); // 小到大
    const localData = labels.map(y => teacherTurnoverData[y]?.local[schoolLevel] || 0);
    const nationalData = labels.map(y => teacherTurnoverData[y]?.national[schoolLevel] || 0);

    const datasets = [
        {
            label: "偏鄉",
            data: localData,
            backgroundColor: "rgba(76, 175, 80, 0.7)",
            borderColor: "rgba(76, 175, 80, 1)",
            borderWidth: 2,
        }
    ];

    if (compare) {
        // 過濾掉null值的資料點
        const filteredLabels = [];
        const filteredLocalData = [];
        const filteredNationalData = [];
        
        labels.forEach((year, index) => {
            const nationalValue = nationalData[index];
            if (nationalValue !== null && nationalValue !== 0) {
                filteredLabels.push(year);
                filteredLocalData.push(localData[index]);
                filteredNationalData.push(nationalValue);
            }
        });

        if (filteredNationalData.length > 0) {
            datasets.push({
                label: "全國",
                data: nationalData,
                backgroundColor: "rgba(255, 99, 132, 0.7)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
            });
        }
    }

    chartInstance.current = new Chart(ctx, {
        type: chartType,
        data: {
            labels,
            datasets,
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: "white" }
                }
            },
            scales: {
                x: {
                    ticks: { color: "white" }
                },
                y: {
                    ticks: { color: "white" },
                    beginAtZero: true,
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        }
    });
}, [years, chartType, compare, selectedData, schoolLevel]);

//代理教師比率Chart.js
useEffect(() => {
    if (selectedData !== "substituteTeacher") return;
    
    // 空值檢查
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) {
        chartInstance.current.destroy();
    }

    const labels = years.sort((a, b) => a - b); // 小到大
    const localData = labels.map(y => substituteTeacherData[y]?.local || 0);
    const nationalData = labels.map(y => substituteTeacherData[y]?.national || 0);

    const datasets = [
        {
            label: "偏遠地區",
            data: localData,
            backgroundColor: "rgba(255, 193, 7, 0.7)",
            borderColor: "rgba(255, 193, 7, 1)",
            borderWidth: 2,
        }
    ];

    if (compare) {
        datasets.push({
            label: "全國",
            data: nationalData,
            backgroundColor: "rgba(255, 99, 132, 0.7)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
        });
    }

    chartInstance.current = new Chart(ctx, {
        type: chartType,
        data: {
            labels,
            datasets,
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: "white" }
                }
            },
            scales: {
                x: {
                    ticks: { color: "white" }
                },
                y: {
                    ticks: { color: "white" },
                    beginAtZero: true,
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        }
    });
}, [years, chartType, compare, selectedData]);

const toggleYear = (year) => {
    setYears(prev => 
        prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
};

const getSchoolLevelName = (level) => {
    switch(level) {
        case 'elementary': return '國小';
        case 'middle': return '國中';
        case 'high': return '高中職';
        default: return '';
    }
};

const renderTeacherStudentRatio = () => {
    return (
        <div>
            <h4 className="mb-4 text-center">
                <i className="fas fa-users me-2"></i>
                師生比
            </h4>

            {/* 功能區塊 */}
            <div className="controls-section mb-4">
                {/* 對比按鈕 */}
                <div className="control-group mb-3">
                    <button 
                        className={`control-btn compare-btn ${compare ? 'active' : ''}`}
                        onClick={() => setCompare(!compare)}
                    >
                        <i className="fas fa-balance-scale me-2"></i>
                        {compare ? "取消對比" : "和全國對比"}
                    </button>
                </div>

                {/* 學年度選擇 */}
                <div className="control-group mb-3">
                    <label className="control-label mb-2">
                        <i className="fas fa-calendar-alt me-2"></i>
                        選擇學年度
                    </label>
                    <div className="year-buttons">
                        {[109,110,111,112].map(y => (
                            <button
                                key={y}
                                className={`year-btn ${years.includes(String(y)) ? "active" : ""}`}
                                onClick={() => toggleYear(String(y))}
                            >
                                {y}學年
                            </button>
                        ))}
                    </div>
                </div>

                {/* 圖表類型選擇 */}
                <div className="control-group mb-3">
                    <label className="control-label mb-2">
                        <i className="fas fa-chart-bar me-2"></i>
                        圖表類型
                    </label>
                    <div className="chart-type-buttons">
                        <button 
                            className={`chart-type-btn ${chartType === 'bar' ? 'active' : ''}`}
                            onClick={() => setChartType('bar')}
                        >
                            <i className="fas fa-chart-bar me-2"></i>
                            長條圖
                        </button>
                        <button 
                            className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
                            onClick={() => setChartType('line')}
                        >
                            <i className="fas fa-chart-line me-2"></i>
                            折線圖
                        </button>
                    </div>
                </div>
            </div>

            {/* 圖表 */}
            <div className="chart-container">
                <canvas ref={chartRef} height="150"></canvas>
            </div>
        </div>
    );
};

const renderTeacherTurnover = () => {
    return (
        <div>
            <h4 className="mb-4 text-center">
                <i className="fas fa-exchange-alt me-2"></i>
                教師流動率
            </h4>

            {/* 功能區塊 */}
            <div className="controls-section mb-4">
                {/* 對比按鈕 */}
                <div className="control-group mb-3">
                    <button 
                        className={`control-btn compare-btn ${compare ? 'active' : ''}`}
                        onClick={() => setCompare(!compare)}
                    >
                        <i className="fas fa-balance-scale me-2"></i>
                        {compare ? "取消對比" : "和全國對比"}
                    </button>
                    {compare && (
                        <small className="text-white-50 mt-1">
                            註：113學年度全國資料尚未公布
                        </small>
                    )}
                </div>

                {/* 學校層級選擇 */}
                <div className="control-group mb-3">
                    <label className="control-label mb-2">
                        <i className="fas fa-school me-2"></i>
                        學校層級
                    </label>
                    <div className="school-level-buttons">
                        <button
                            className={`school-level-btn ${schoolLevel === 'elementary' ? 'active' : ''}`}
                            onClick={() => setSchoolLevel('elementary')}
                        >
                            <i className="fas fa-child me-2"></i>
                            國小
                        </button>
                        <button
                            className={`school-level-btn ${schoolLevel === 'middle' ? 'active' : ''}`}
                            onClick={() => setSchoolLevel('middle')}
                        >
                            <i className="fas fa-user-graduate me-2"></i>
                            國中
                        </button>
                        <button
                            className={`school-level-btn ${schoolLevel === 'high' ? 'active' : ''}`}
                            onClick={() => setSchoolLevel('high')}
                        >
                            <i className="fas fa-graduation-cap me-2"></i>
                            高中職
                        </button>
                    </div>
                </div>

                {/* 學年度選擇 */}
                <div className="control-group mb-3">
                    <label className="control-label mb-2">
                        <i className="fas fa-calendar-alt me-2"></i>
                        選擇學年度
                    </label>
                    <div className="year-buttons">
                        {[109,110,111,112,113].map(y => (
                            <button
                                key={y}
                                className={`year-btn ${years.includes(String(y)) ? "active" : ""}`}
                                onClick={() => toggleYear(String(y))}
                            >
                                {y}學年
                            </button>
                        ))}
                    </div>
                </div>

                {/* 圖表類型選擇 */}
                <div className="control-group mb-3">
                    <label className="control-label mb-2">
                        <i className="fas fa-chart-bar me-2"></i>
                        圖表類型
                    </label>
                    <div className="chart-type-buttons">
                        <button 
                            className={`chart-type-btn ${chartType === 'bar' ? 'active' : ''}`}
                            onClick={() => setChartType('bar')}
                        >
                            <i className="fas fa-chart-bar me-2"></i>
                            長條圖
                        </button>
                        <button 
                            className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
                            onClick={() => setChartType('line')}
                        >
                            <i className="fas fa-chart-line me-2"></i>
                            折線圖
                        </button>
                    </div>
                </div>
            </div>

            {/* 圖表 */}
            <div className="chart-container">
                <canvas ref={chartRef} height="150"></canvas>
            </div>
        </div>
    );
};

const renderSubstituteTeacher = () => {
    return (
        <div>
            <h4 className="mb-4 text-center">
                <i className="fas fa-user-tie me-2"></i>
                國小代理教師比率
            </h4>

            {/* 功能區塊 */}
            <div className="controls-section mb-4">
                {/* 對比按鈕 */}
                <div className="control-group mb-3">
                    <button 
                        className={`control-btn compare-btn ${compare ? 'active' : ''}`}
                        onClick={() => setCompare(!compare)}
                    >
                        <i className="fas fa-balance-scale me-2"></i>
                        {compare ? "取消對比" : "和全國對比"}
                    </button>
                </div>

                {/* 學年度選擇 */}
                <div className="control-group mb-3">
                    <label className="control-label mb-2">
                        <i className="fas fa-calendar-alt me-2"></i>
                        選擇學年度
                    </label>
                    <div className="year-buttons">
                        {[108,109,110,111].map(y => (
                            <button
                                key={y}
                                className={`year-btn ${years.includes(String(y)) ? "active" : ""}`}
                                onClick={() => toggleYear(String(y))}
                            >
                                {y}學年
                            </button>
                        ))}
                    </div>
                </div>

                {/* 圖表類型選擇 */}
                <div className="control-group mb-3">
                    <label className="control-label mb-2">
                        <i className="fas fa-chart-bar me-2"></i>
                        圖表類型
                    </label>
                    <div className="chart-type-buttons">
                        <button 
                            className={`chart-type-btn ${chartType === 'bar' ? 'active' : ''}`}
                            onClick={() => setChartType('bar')}
                        >
                            <i className="fas fa-chart-bar me-2"></i>
                            長條圖
                        </button>
                        <button 
                            className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
                            onClick={() => setChartType('line')}
                        >
                            <i className="fas fa-chart-line me-2"></i>
                            折線圖
                        </button>
                    </div>
                </div>
            </div>

            {/* 圖表 */}
            <div className="chart-container">
                <canvas ref={chartRef} height="150"></canvas>
            </div>
        </div>
    );
};

return (
    <div className="container-fluid">
        <div className="glass-container">
            <h1 className="main-title">
                <i className="fas fa-graduation-cap me-3"></i>
                台灣教育數據
            </h1>
            
            <div className="row">
                <div className="col-md-4 d-flex">
                    <button 
                        className="glass-button w-100"
                        onClick={handleTeacherStudentRatio}
                    >
                        <div>
                            <i className="fas fa-users button-icon"></i>
                            師生比
                        </div>
                    </button>
                </div>
                <div className="col-md-4 d-flex">
                    <button 
                        className="glass-button w-100"
                        onClick={handleTeacherTurnover}
                    >
                        <div>
                            <i className="fas fa-exchange-alt button-icon"></i>
                            教師流動率
                        </div>
                    </button>
                </div>
                <div className="col-md-4 d-flex">
                    <button 
                        className="glass-button w-100"
                        onClick={handleSubstituteTeacher}
                    >
                        <div>
                            <i className="fas fa-user-tie button-icon"></i>
                            代理教師比率
                        </div>
                    </button>
                </div>
            </div>

            <div className="data-display w-100">
                {!selectedData && (
                    <div className="text-center">
                        <i className="fas fa-chart-line mb-3" style={{fontSize: '3rem', opacity: 0.5}}></i>
                        <p>請選擇上方按鈕查看教育數據統計</p>
                    </div>
                )}
                {selectedData === "teacherStudentRatio" && renderTeacherStudentRatio()}
                {selectedData === "teacherTurnover" && renderTeacherTurnover()}
                {selectedData === "substituteTeacher" && renderSubstituteTeacher()}
            </div>
        </div>
    </div>
);
