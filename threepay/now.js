const { useState } = React;

const EducationDataApp = () => {
    const [message, setMessage] = useState(null);

    const handleDataRequest = () => {
        setMessage("我做了嗎你就按");
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
                            onClick={handleDataRequest}
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
                            onClick={handleDataRequest}
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
                            onClick={handleDataRequest}
                        >
                            <div>
                                <i className="fas fa-chart-line button-icon"></i>
                                學力差距
                            </div>
                        </button>
                    </div>
                </div>

                <div className="data-display text-center">
                    {message ? message : "請選擇上方按鈕查看教育數據統計"}
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(<EducationDataApp />, document.getElementById('root'));
