import csv

store = {}
drinks = {}
max_order = None

with open('sales_data.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    
    for row in reader:
        branch = row["分店"]
        amount = int(row["金額"]) 

        if max_order is None or amount > int(max_order["金額"]):
            max_order = row

        drink = row["飲品"]
        count = int(row["數量"])

        if branch not in store:
            store[branch] = 0
        if branch in store:
            store[branch] += amount

        if drink not in drinks:
            drinks[drink] = 0
        if drink in drinks:
            drinks[drink] += count
    
print("=" * 50)
print("咖啡店銷售分析報表".center(45))
print("=" * 50,'\n')

print(f"總營收：NT$ {sum(store.values()):,}",'\n')

sorted_store = sorted(store, key=store.get, reverse=True)

print("各分店業績：")
for k in sorted_store:
    print(f"  {k}：NT$ {store[k]:,}")

業績冠軍 = max(store, key=store.get)
print(f"\n業績冠軍：{業績冠軍}",'\n')

sorted_drinks = sorted(drinks, key=drinks.get, reverse=True)

print("飲品銷售數量：")
for drink in sorted_drinks:
    print(f"  {drink}：{drinks[drink]} 杯")

最熱銷飲品 = max(drinks, key=drinks.get)
print(f"\n最受歡迎飲品：{最熱銷飲品}",'\n')

print("單筆最高消費訂單：")
print(f"  訂單編號：{max_order['訂單編號']}")
print(f"  金額：{int(max_order['金額']):,}")
print(f"  飲品：{max_order['飲品']} x {(max_order['數量'])}",'\n')
print("=" * 50)
