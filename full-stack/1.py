import pandas as pd

data = {"Name": ["Alice", "Bob", "Charlie"],
        "Age": [25, 30, 35],
        "City": ["Delhi", "Mumbai", "Kolkata"]}
df = pd.DataFrame(data, index=["a", "b", "c"])


print(df,"\n\n")
print(df.loc["a"])            # Access row with label 'a'
print(df.loc[:, "Name"])      # Access 'Name' column
print(df.loc["a":"b"])        # Slice rows from 'a' to 'b' (inclusive)


print("----")

print(df.iloc[0])             # First row
print(df.iloc[:, 0])          # First column
print(df.iloc[0:2])    

print(df.iloc[0,2])# Rows at index positions 0 and 1 (exclusive of 2)


# import pandas as pd

data = {
    "Name": ["Alice", "Bob", None],
    "Age": [25, None, 30],
    "City": ["Delhi", "Mumbai", None]
}
df = pd.DataFrame(data)

print("Original DataFrame:\n", df)

# Drop rows with NaN values
df_drop = df.dropna()
print("\nAfter dropna (rows with NaN removed):\n", df_drop)

# Drop columns with NaN values
df_drop_col = df.dropna(axis=1)
print("\nAfter dropna (columns with NaN removed):\n", df_drop_col)



data = {"A": [1, None, None, 4, None, 6]}
df = pd.DataFrame(data)

print("Original:\n", df)

# Forward fill
df_ffill = df.fillna(method="ffill")
print("\nAfter Forward Fill (ffill):\n", df_ffill)



print("frequeccy counting")

li=[1,1,2,2,3,3,4,4,5]

dit=dict()
for iten in li:
    if iten in dit:
        dit[iten]+=1
    else:
        dit[iten]=1

print("Frequency of elements:", dit)