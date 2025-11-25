try:
    while True:
        檔名 = input('請輸入日記檔名:')
        if 檔名 == 'quit':
                break
        檔名 = './diaries/' + 檔名
        try:
            
            f = open(檔名, 'r', encoding='utf-8')
            內容 = f.read()
            f.close()
            print('---日記開始---')
            print(內容)
            print(f'---日記結束---\n')
            
        except FileNotFoundError:
            print(f'蛤你是不是打錯字，沒有這篇日記ㄟ\n')
            
        except Exception:
            print(f'好像哪裡怪怪的\n')
        
finally:
        print('下次見~')
        print('程式結束')