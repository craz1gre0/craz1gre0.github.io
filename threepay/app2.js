const { useState } = React;

const EducationDataApp = () => {
    const [selectedData, setSelectedData] = useState(null);
    const [year, setYear] = useState("113");
    const [chartType, setChartType] = useState("bar");
    const [compare, setCompare] = useState(false);

    // 假資料（之後可改成 API）
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

    const renderTeacherStudentRatio = () => {
        const data = teacherStudentRatioData[year];

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

                    <select 
                        className="form-select w-auto m-1"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        {[113,112,111,110,109,108].map(y => (
                            <option key={y} value={y}>{y}學年度</option>
                        ))}
                    </select>

                    <select 
                        className="form-select w-auto m-1"
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value)}
                    >
                        <option value="bar">長條圖</option>
                        <option value="line">折線圖</option>
                    </select>
                </div>

                {/* 數據顯示 */}
                <div className="text-center mb-3">
                    <p>本地師生比：1:{data.local}</p>
                    {compare && <p>全國師生比：1:{data.national}</p>}
                </div>

                {/* 圖表區（用 Chart.js 或假圖代替） */}
                <div className="p-3 bg-dark rounded text-white text-center">
                    <p>{chartType === "bar" ? "這裡會顯示長條圖" : "這裡會顯示折線圖"}</p>
                    <p>年份：{year} 學年度</p>
                    {compare ? <p>顯示「本地 vs 全國」</p> : <p>只顯示「本地」</p>}
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

                <div className="data-display">
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
