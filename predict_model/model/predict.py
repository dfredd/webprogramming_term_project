import pickle
import sys
import pandas as pd

# Load the model
with open('../lin_model.pkl', 'rb') as f:
    lin_model = pickle.load(f)

# Get input data from command line arguments
movie_runtime = float(sys.argv[1])
movie_revenue = float(sys.argv[2])

# Create a DataFrame with the same feature names used during training
features = pd.DataFrame([[movie_runtime, movie_revenue]], columns=['runtime', 'revenue'])

# Make prediction
prediction = lin_model.predict(features)

# Print the prediction to stdout
print(prediction[0])
