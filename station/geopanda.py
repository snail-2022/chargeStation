import geopandas as gpd
from sqlalchemy import create_engine

# 数据库连接 URL
db_connection_url = "postgresql://postgres:czk9494886@myhost:5432/mydatabase"

# 创建数据库引擎
engine = create_engine(db_connection_url)

# 定义 SQL 查询以从数据库中获取数据
sql_query = "SELECT * FROM countries_table"

# 使用 GeoPandas 从数据库中读取数据
countries_gdf = gpd.read_postgis(sql_query, con=engine, geom_col='geometry')

# 打印 GeoDataFrame 信息
print(countries_gdf.head())
