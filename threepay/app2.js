const { useState, useEffect, useRef } = React;

const EducationDataApp = () => {
    const [selectedData, setSelectedData] = useState(null);
    const [years, setYears] = useState(["113"]);
    const [chartType, setChartType] = useState("bar");
    const [compare, setCompare] = useState(false);
    const chartRef = useRef(null);
    let chartInstance = useRef(null);

    // 假資料（可換成 API）
    const teacherStudentRatioData = {
        "113": { local: 12.5, national: 13.0 },
        "112": { local: 12.8, national: 13.2 },
        "111": { local: 13.0, national: 13.5 },
        "110": { local: 13.4, national: 13.6 },
        "109": { local: 13.7, national: 14.0 },
        "108": { local: 14.0, national: 14.2 },
    };

    const handleTeacherStudentRatio = () => {
        setSelectedData("teacherStudentRatio");
    };

    // 更新 Chart.js
    useEffect(() => {
        if (selectedData !== "teacherStudentRatio") return;

        const ctx = chartRef.current.getContext("2d");
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const labels = years.sort((a, b) => b - a); // 由大到小
        const localData = labels.map(y => teacherStudentRatioData[y].local);
        const nationalData = labels.map(y => teacherStudentRatioData[y].national);

        const datasets = [
            {
                label: "本地",
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
                <h4 className="mb-3 text-center">
                    <i className="fas fa-users me-2"></i>
                    師生比
                </h4>

                {/* 功能區塊 */}
                <div className="d-flex justify-content-center mb-3 flex-wrap">
                    <button 
                        className="btn btn-outline-light m-1"
                        onClick={() => setCompare(!compare)}
                    >
                        {compare ? "取消對比" : "和全國對比"}
                    </button>

                    {/* 學年度多選 */}
                    <div className="d-flex flex-wrap">
                        {[113,112,111,110,109,108].map(y => (
                            <button
                                key={y}
                                className={`btn m-1 ${years.includes(String(y)) ? "btn-light" : "btn-outline-light"}`}
                                onClick={() => toggleYear(String(y))}
                            >
                                {y}
                            </button>
                        ))}
                    </div>

                    {/* 圖表切換 */}
                    <select 
                        className="form-select w-auto m-1"
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value)}
                    >
                        <option value="bar">長條圖</option>
                        <option value="line">折線圖</option>
                    </select>
                </div>

                {/* 圖表 */}
                <canvas ref={chartRef} height="150"></canvas>
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
