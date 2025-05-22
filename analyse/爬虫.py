import csv
import json
import random
import re
from DrissionPage import ChromiumPage
#from DrissionPage.common import ActionChains
import pymysql
import requests
# 创建页面对象，并启动或接管浏览器
page = ChromiumPage()
def null2str(str):
    if str==None  or str=='':
       return "无"
    else:
        str = str.strip().replace(',', '，').replace('"', '').replace("'", '').replace("\n", '').replace('\r','').replace( '\t', '')
        return str

connect = None
connect = pymysql.connect(host="localhost",port=3306, user="root",
                                           password="123456", database="pome")
cur = connect.cursor()
cur.execute('''SELECT * FROM author''')
rv = cur.fetchall()
cur.close()
connect.close()
for result in rv:
    author=result[0]
    src=result[4]
    print(author,src)
    page.get('https://hanyu.baidu.com/s?wd='+author+'&from=poem')
    try:
       new_img=page.ele('xpath://img[@class="poem-author-img"]').link
    except:
       new_img='https://img2.baidu.com/it/u=1080228242,3641064450&fm=253&fmt=auto&app=120&f=JPEG?w=380&h=285'
    print(new_img)
    #page.close_tabs()
    connect = pymysql.connect(host="localhost", port=3306, user="root",
                              password="123456", database="pome")
    cur = connect.cursor()
    sql="update author set src='"+new_img+"' where author='"+author+"'"
    cur.execute(sql)
    connect.commit()
    cur.close()
    connect.close()
    print('爬虫正在采集...',author,src,new_img)
