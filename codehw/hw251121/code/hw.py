import csv

業績 = {}
飲品s = {}
最高消費訂單 = None

with open('sales_data.csv', 'r', encoding='utf-8') as f:
    內容 = csv.DictReader(f)
    
    for row in 內容:
        分店 = row["分店"]
        金額 = int(row["金額"]) 

        if 最高消費訂單 is None or 金額 > int(最高消費訂單["金額"]):
            最高消費訂單 = row

        飲品 = row["飲品"]
        數量 = int(row["數量"])

        if 分店 not in 業績:
            業績[分店] = 0
        if 分店 in 業績:
            業績[分店] += 金額

        if 飲品 not in 飲品s:
            飲品s[飲品] = 0
        if 飲品 in 飲品s:
            飲品s[飲品] += 數量
    
print("=" * 50)
print("咖啡店銷售分析報表".center(45))
print("=" * 50,'\n')

print(f"總營收：NT$ {sum(業績.values()):,}",'\n')

sorted_store = sorted(業績, key=業績.get, reverse=True)

print("各分店業績：")
for k in sorted_store:
    print(f"  {k}：NT$ {業績[k]:,}")

業績冠軍 = max(業績, key=業績.get)
print(f"\n業績冠軍：{業績冠軍}",'\n')

sorted_drinks = sorted(飲品s, key=飲品s.get, reverse=True)

print("飲品銷售數量：")
for drink in sorted_drinks:
    print(f"  {drink}：{飲品s[drink]} 杯")

最熱銷飲品 = max(飲品s, key=飲品s.get)
print(f"\n最受歡迎飲品：{最熱銷飲品}",'\n')

print("單筆最高消費訂單：")
print(f"  訂單編號：{最高消費訂單['訂單編號']}")
print(f"  金額：{int(最高消費訂單['金額']):,}")
print(f"  飲品：{最高消費訂單['飲品']} x {(最高消費訂單['數量'])}",'\n')
print("=" * 50)
