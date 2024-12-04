import os
from dotenv import load_dotenv
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.neighbors import KNeighborsRegressor
from sklearn.ensemble import RandomForestRegressor
import pymongo
import pickle

load_dotenv()

client = pymongo.MongoClient(
    f'mongodb://user_1:{os.environ.get("MONGODB_PASSWORD")}@mongo.bluewarn.dev:27018', 
    authSource='webprogramming', tls=True
)
db = client['webprogramming']
collection = db['movies']

# MongoDB에서 데이터 가져오기
data = list(collection.aggregate([
    { '$project': { # RDB의 SELECT에 대응. 1이면 포함 0이면 제외, 학습에 필요한 속성만 가져온다.
        "revenue": 1,
        "runtime": 1,
        "omdb_rate": 1,
        "_id": 0
    }}
]))

# 데이터프레임으로 변환
train = pd.DataFrame(data)
train = train.dropna(how='any')

# 데이터 확인
print(train.head())

top_10_revenue = train.sort_values(by='revenue', ascending=False).head(10)
print(top_10_revenue)

# top_10_budget = train.sort_values(by='budget', ascending=False).head(10)
# print(top_10_budget)

# # budget 히스토그램과 KDE, 0부터 10퍼센트 구간만 자세히 보기
# sns.histplot(train.budget, kde=True, stat="density")
# plt.savefig("budget_히스토그램.png")
# plt.clf()

# revenue 히스토그램과 KDE, 0부터 10퍼센트 구간만 자세히 보기
sns.histplot(train.revenue, kde=True, stat="density")
plt.savefig("revenue_히스토그램.png")
plt.clf()

# 수치형 데이터만 선택, 상관 계수 계산.
numeric_features = train.select_dtypes(include=[np.number])
# 결측치 처리 (예: 평균값으로 대체)
# numeric_features = numeric_features.fillna(method='ffill')
correlation_matrix = numeric_features.corr()

print("상관계수: ", correlation_matrix)

sns.heatmap(numeric_features.corr(), cmap='YlGnBu', annot=True, linewidths = 0.2);
plt.savefig("correlation_matrix.png")
plt.clf()

print('Descriptive Stats for the revenue are:\n ', train.revenue.describe())
sns.histplot(train.revenue, kde=True)
plt.savefig("histplot_train.revenue.png")
plt.clf()

print('Descriptive Stats for the omdb_rate are:\n ', train.omdb_rate.describe())
sns.histplot(train.omdb_rate, kde=True)
plt.savefig("histplot_train.omdb_rate.png")
plt.clf()

# sns.jointplot(x = train.budget, y = train.omdb_rate);
# plt.savefig("jointPlot_budget_omdb_rate.png")
# plt.clf()
sns.jointplot(x = train.runtime, y = train.omdb_rate);
plt.savefig("jointPlot_runtime_omdb_rate.png")
plt.clf()

# sns.boxplot(x=train['budget'])
# plt.savefig("budget_박스플롯.png")
# plt.clf()

sns.boxplot(x=train['revenue'])
plt.savefig("revenue_박스플롯.png")
plt.clf()

sns.boxplot(x=train['omdb_rate'])
plt.savefig("omdb_rate_박스플롯.png")
plt.clf()

# 모델 Building

# 독립 변수와 종속 변수 분리
X = train.drop(columns=['omdb_rate'])  # 'revenue' 열을 종속 변수로 사용
y = train['omdb_rate']

# splitting the data into training and validation to check validity of the model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=1)

# 데이터 확인
print(f"학습 데이터 크기: {X_train.shape}")
print(f"테스트 데이터 크기: {X_test.shape}")

print(X_train)

# Linear Model
def rmsle(y,y0): return np.sqrt(np.mean(np.square(np.log1p(y)-np.log1p(y0)))) 
reg = LinearRegression()
lin_model = reg.fit(X_train, y_train)
y_pred = lin_model.predict(X_test)
print('RMSLE score for linear model is {}'.format(rmsle(y_test, y_pred)))
pred1 = lin_model.predict(X_test)

print(f'예측된 평점: {pred1[0]}')

with open('lin_model.pkl', 'wb') as f:
    pickle.dump(lin_model, f)

knn = KNeighborsRegressor(n_neighbors = 5)
knn_model = knn.fit(X_train, y_train)
knn_y_pred = knn.predict(X_test)
print('RMSLE score for k-NN model is {}'.format(rmsle(y_test, knn_y_pred)))
pred2 = knn.predict(X_test)

print(f'예측된 평점: {pred2[0]}')

rf = RandomForestRegressor()
rf_model = rf.fit(X_train, y_train)
rf_y_pred = rf.predict(X_test)
print('RMSLE score for Random Forest model is {}'.format(rmsle(y_test, rf_y_pred)))
pred3 = rf.predict(X_test)

print(f'예측된 평점: {pred3[0]}')

dic = pd.DataFrame({
    # "budget": [74000000],
    "runtime": [91],
    "revenue": [1159457503],
})

print(lin_model.predict(dic))
print(knn_model.predict(dic))
print(rf_model.predict(dic))
