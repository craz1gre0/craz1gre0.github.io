// Restaurant Management System
let restaurants = [];

// Load restaurant data
async function loadData() {
    try {
        const response = await fetch('restaurants.json');
        restaurants = await response.json();
        updateUI();
    } catch (error) {
        console.error('載入資料失敗:', error);
        alert('無法載入餐廳資料,請確認 JSON 檔案存在');
    }
}

// Update UI
function updateUI() {
    updateTable();
    updateFilterOptions();
}

// Search by name
function searchByName() {
    const searchValue = document.getElementById('searchName').value.toLowerCase();
    
    if (!searchValue) {
        document.getElementById('searchResult').innerHTML = '<div class="no-result"><i class="bi bi-emoji-frown"></i><br>請輸入餐廳名稱</div>';
        return;
    }
    
    const results = restaurants.filter(r => r.name.toLowerCase().includes(searchValue));
    const resultDiv = document.getElementById('searchResult');
    
    if (results.length > 0) {
        let html = `
            <div class="search-result-header">
                <h5><i class="bi bi-check-circle"></i> 查詢結果 (共 ${results.length} 家餐廳)</h5>
            </div>
        `;
        
        results.forEach((restaurant, index) => {
            html += `
                <div class="restaurant-card">
                    <div class="restaurant-card-header">
                        <h6 class="restaurant-name">${restaurant.name}</h6>
                        <span class="badge bg-secondary">編號 ${restaurant.id}</span>
                    </div>
                    <div class="restaurant-card-body">
                        <div class="result-item">
                            <span class="result-label"><i class="bi bi-geo-alt"></i> 地區:</span>
                            <span class="result-value">${restaurant.area || '<span class="text-muted">未設定</span>'}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label"><i class="bi bi-currency-dollar"></i> 價位:</span>
                            <span class="result-value">${restaurant.price || '<span class="text-muted">未設定</span>'}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label"><i class="bi bi-map"></i> 地圖:</span>
                            <span class="result-value">${restaurant.mapUrl ? '<span class="text-success">✓</span>' : '<span class="text-muted">✗</span>'}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        resultDiv.innerHTML = html;
    } else {
        resultDiv.innerHTML = '<div class="no-result"><i class="bi bi-emoji-frown"></i><br>找不到符合的餐廳</div>';
    }
}

// Update table
function updateTable(filteredList = null) {
    const data = filteredList || restaurants;
    const tbody = document.getElementById('tableBody');
    
    tbody.innerHTML = data.map(restaurant => `
        <tr>
            <td class="d-none d-md-table-cell">${restaurant.id}</td>
            <td>
                <strong class="restaurant-name">${restaurant.name}</strong>
            </td>
            <td class="d-none d-sm-table-cell">${restaurant.area || '<span class="text-muted">-</span>'}</td>
            <td>
                <span class="d-none d-sm-inline">${restaurant.area || '<span class="text-muted">未設定</span>'}</span>
            </td>
            <td>${restaurant.price || '<span class="text-muted">未設定</span>'}</td>
            <td class="text-center">
                ${restaurant.mapUrl ? '<span class="text-success">✓</span>' : '<span class="text-muted">✗</span>'}
            </td>
            <td class="text-center">
                <button class="btn btn-sm btn-primary" onclick="cloneRestaurant(${restaurant.id})" title="複製餐廳">
                    <i class="bi bi-files"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Clone restaurant function
function cloneRestaurant(id) {
    const original = restaurants.find(r => r.id === id);
    if (!original) {
        alert('找不到要複製的餐廳');
        return;
    }
    
    // Find the highest ID to generate a new one
    const maxId = Math.max(...restaurants.map(r => r.id));
    
    // Create a clone with a new ID
    const clone = {
        ...original,
        id: maxId + 1,
        name: original.name + ' (副本)'
    };
    
    // Add to the restaurants array
    restaurants.push(clone);
    
    // Update the UI
    updateUI();
    
    // Show success message
    alert(`已複製餐廳「${original.name}」，新餐廳編號為 ${clone.id}`);
}

// Update filter options
function updateFilterOptions() {
    const areas = [...new Set(restaurants.map(r => r.area).filter(a => a))];
    const filterArea = document.getElementById('filterArea');
    
    filterArea.innerHTML = '<option value="">所有地區</option>' + 
        areas.map(area => `<option value="${area}">${area}</option>`).join('');
}

// Filter restaurants
function filterRestaurants() {
    const areaValue = document.getElementById('filterArea').value;
    const priceValue = document.getElementById('filterPrice').value;
    
    let filtered = restaurants;
    
    if (areaValue) {
        filtered = filtered.filter(r => r.area === areaValue);
    }
    
    if (priceValue) {
        filtered = filtered.filter(r => r.price === priceValue);
    }
    
    updateTable(filtered);
}

// Export to JSON
function exportToJSON() {
    const json = JSON.stringify(restaurants, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'restaurants.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Initialize on load
loadData();
