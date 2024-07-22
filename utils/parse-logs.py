#!/usr/bin/env python3

import re
import os
from datetime import datetime

users = {}
sites = {}
domains = {}
tz = {}

domain_re = re.compile(r"(?:http(?:s|):\/\/|)([\w\d]+?\.[\w\d\.]+)")

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

        if "uuid" in entry:
            if entry["uuid"] not in users:
                users[entry["uuid"]] = 1
            else:
                users[entry["uuid"]] += 1

        if "path" in entry:
            if entry["path"] not in sites:
                sites[entry["path"]] = 1
            else:
                sites[entry["path"]] += 1

        if "tz" in entry:
            if entry["tz"] not in tz:
                tz[entry["tz"]] = 1
            else:
                tz[entry["tz"]] += 1

        entry = {}
        continue

for i in sites.keys():
    domain = domain_re.search(i)
    if not domain:
        continue

    (domain,) = domain.groups()
    domain = domain.strip().lower()

    if domain not in domains:
        domains[domain] = sites[i]
    else:
        domains[domain] += sites[i]

users = sorted(users.items(), key=lambda x: x[1], reverse=True)
sites = sorted(sites.items(), key=lambda x: x[1], reverse=True)
domains = sorted(domains.items(), key=lambda x: x[1], reverse=True)
tz = sorted(tz.items(), key=lambda x: x[1], reverse=True)

print("Top 50 users")
print("=" * 50)
for i in users[:50]:
    print(f"{i[0]}: {i[1]}")

print("=" * 50)
print(f"Total users: {len(users)}")
print("=" * 50)

print("Top 50 domains")
print("=" * 50)
for i in domains[:50]:
    print(f"{i[0]}: {i[1]}")

print("=" * 50)
print(f"Total domains: {len(sites)}")
print("=" * 50)

print("Top 50 user timezones")
print("=" * 50)
for i in tz[:50]:
    print(f"{i[0]}: {i[1]}")

print("=" * 50)
print("Top 50 urls")
print("=" * 50)
for i in sites[:50]:
    print(f"{i[0]}: {i[1]}")

print("=" * 50)
print(f"Total urls: {len(sites)}")
print("=" * 50)
