import csv #引入csv模組來讀取csv檔案

store = {} #放店名和銷售額 {"分店A":5000, "分店B":3000}
drinks = {} #放飲品和銷售數量 {"拿鐵":100, "美式":80}
max_order = None #放最高消費訂單的資料

with open('sales_data.csv', 'r', encoding='utf-8') as f:  #開啟csv檔案
    reader = csv.DictReader(f) #去看csv模組語法
    
    for row in reader: #逐行讀取csv檔案
        branch = row["分店"]
        amount = int(row["金額"]) 

        if max_order is None or amount > int(max_order["金額"]): #找出最高消費訂單
            max_order = row

        drink = row["飲品"]
        count = int(row["數量"])

        if branch not in store: #檢查分店是否在字典中，沒有就新增
            store[branch] = 0
        if branch in store: #已經有這個分店了，就加上金額
            store[branch] += amount

        if drink not in drinks: #檢查飲品是否在字典中，沒有就新增
            drinks[drink] = 0
        if drink in drinks: #已經有這個飲品了，就加上數量
            drinks[drink] += count
    
print("=" * 50)
print("咖啡店銷售分析報表".center(45)) #置中 "咖啡店銷售分析報表"
print("=" * 50,'\n')

print(f"總營收：NT$ {sum(store.values()):,}",'\n') #計算總營收用千分位顯示(:,)

sorted_store = sorted(store, key=store.get, reverse=True) #排序

print("各分店業績：")
for k in sorted_store:
    print(f"  {k}：NT$ {store[k]:,}")

業績冠軍 = max(store, key=store.get) #找出業績最高的分店
print(f"\n業績冠軍：{業績冠軍}",'\n')

sorted_drinks = sorted(drinks, key=drinks.get, reverse=True) #排序

print("飲品銷售數量：")
for drink in sorted_drinks:
    print(f"  {drink}：{drinks[drink]} 杯") 

最熱銷飲品 = max(drinks, key=drinks.get) #找出銷售數量最高的飲品
print(f"\n最受歡迎飲品：{最熱銷飲品}",'\n')

print("單筆最高消費訂單：")
print(f"  訂單編號：{max_order['訂單編號']}")
print(f"  金額：{int(max_order['金額']):,}")
print(f"  飲品：{max_order['飲品']} x {(max_order['數量'])}",'\n')
print("=" * 50)
