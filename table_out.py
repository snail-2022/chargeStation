import psycopg2
import json
from decimal import Decimal

# 自定义JSON编码器
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)

# 连接到数据库
conn = psycopg2.connect("dbname=charge_station user=postgres password=czk9494886")
cur = conn.cursor()

# 执行查询
cur.execute("SELECT * FROM stations")
rows = cur.fetchall()

# 获取列名
colnames = [desc[0] for desc in cur.description]

# 转换为 JSON 格式
json_data = []
for row in rows:
    json_data.append(dict(zip(colnames, row)))

# 写入 JSON 文件
with open('output.json', 'w') as f:
    json.dump(json_data, f, indent=2, cls=DecimalEncoder)

# 关闭连接
cur.close()
conn.close()
