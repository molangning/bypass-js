#!/usr/bin/env python3

import os
from datetime import datetime

users = {}
sites = {}

info_logs = sorted(
    [x for x in os.listdir(os.path.join("logs", "info")) if x.endswith(".txt")],
    key=lambda x: datetime.strptime(x, "info-%d-%m-%Y.txt"),
    reverse=True,
)

error_logs = sorted(
    [x for x in os.listdir(os.path.join("logs", "error")) if x.endswith(".txt")],
    key=lambda x: datetime.strptime(x, "info-%d-%m-%Y.txt"),
    reverse=True,
)

for i in info_logs:
    content = open(os.path.join("logs", "info", i), "r").read().splitlines()
    entry = {}
    for line in content:
        if not line.startswith("="):
            try:
                name, value = line.split(": ", 1)
                entry[name] = value
            except ValueError:
                pass

            continue

        if entry["uuid"] not in users:
            users[entry["uuid"]] = 1
        else:
            users[entry["uuid"]] += 1

        if entry["path"] not in sites:
            sites[entry["path"]] = 1
        else:
            sites[entry["path"]] += 1

        entry = {}
        continue

users = sorted(users.items(), key=lambda x: x[1], reverse=True)
sites = sorted(sites.items(), key=lambda x: x[1], reverse=True)

print("Top users")
print("=" * 50)
for i in users:
    print(f"{i[0]}: {i[1]}")

print("=" * 50)
print(f"Total users: {len(users)}")
print("=" * 50)

print("Top sites")
print("=" * 50)
for i in sites:
    print(f"{i[0]}: {i[1]}")
print("=" * 50)
print(f"Total site: {len(sites)}")
