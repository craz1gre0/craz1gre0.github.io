const { useState, useEffect, useRef } = React;

const EducationDataApp = () => {
    const [selectedData, setSelectedData] = useState(null);
    const [years, setYears] = useState(["112"]);
    const [chartType, setChartType] = useState("bar");
    const [compare, setCompare] = useState(false);
    const chartRef = useRef(null);
    let chartInstance = useRef(null);

    // 假資料（可換成 API）
    const teacherStudentRatioData = {
        "112": { local: 12.4, national: 25.4 },
        "111": { local: 12.6, national: 25.5 },
        "110": { local: 12.8, national: 25.6 },
        "109": { local: 13.0, national: 25.8 },
    };

    const handleTeacherStudentRatio = () => {
        setSelectedData("teacherStudentRatio");
    };

    // 更新 Chart.js
    useEffect(() => {
        if (selectedData !== "teacherStudentRatio") return;
        
        // 加入空值檢查
        if (!chartRef.current) return;

        const ctx = chartRef.current.getContext("2d");
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const labels = years.sort((a, b) => b - a); // 由大到小
        const localData = labels.map(y => teacherStudentRatioData[y].local);
        const nationalData = labels.map(y => teacherStudentRatioData[y].national);

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

    const toggleYear = (year) => {
        setYears(prev => 
            prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
        );
    };

    const renderTeacherStudentRatio = () => {
        return (
            <div>
                <h4 className="mb-4 text-center">
                    <i className="fas fa-users me-2"></i>
                    師生比
                </h4>

                {/* 功能區塊 - 優化響應式排版 */}
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
                            {[112,111,110,109].map(y => (
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
                            onClick={() => setSelectedData("computerRatio")}
                        >
                            <div>
                                <i className="fas fa-desktop button-icon"></i>
                                每百位學生可用電腦數
                            </div>
                        </button>
                    </div>
                    <div className="col-md-4 d-flex">
                        <button 
                            className="glass-button w-100"
                            onClick={() => setSelectedData("achievementGap")}
                        >
                            <div>
                                <i className="fas fa-chart-line button-icon"></i>
                                學力差距
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
                    {selectedData === "computerRatio" && <p>電腦數據功能還沒做</p>}
                    {selectedData === "achievementGap" && <p>學力差距功能還沒做</p>}
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(<EducationDataApp />, document.getElementById('root'));
