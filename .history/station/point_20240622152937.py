# -*- coding: utf-8 -*-
"""
Created on Wed Jun 28 15:06:25 2023

@author: jie
"""
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def danZhongXingFa(data):
    print(data)
    # 提取经度、纬度和权重列
    #longitudes = data.iloc[:, 0].values
    #latitudes = data.iloc[:, 1].values
    longitudes = data.iloc[:, 0].values.astype(float)
    latitudes = data.iloc[:, 1].values.astype(float)
    weights = data.iloc[:, 2].values.astype(float)

    # 归一化权重
    weights /= np.sum(weights)

    # 计算重心

    center_longitude = np.dot(longitudes, weights)
    center_latitude = np.dot(latitudes, weights)

    # 生成可视化图表
    plt.scatter(longitudes, latitudes, c='b', label='McDonald\'s')
    plt.scatter(center_longitude, center_latitude, c='r', label='Centroid')
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    plt.title('Centroid of McDonald\'s Restaurants')
    plt.legend()
    plt.show()

    # 输出重心的经纬度信息
    print('Centroid Longitude:', center_longitude)
    print('Centroid Latitude:', center_latitude)
