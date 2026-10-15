#!/usr/bin/env python3
"""Ansible dynamic inventory: one host, passed on the command line.

The target lives in environment variables (or explicit flags), so no file
needs editing per host:

    TARGET_HOST=we-in.ru TARGET_IP=121.127.37.119 ansible-playbook playbooks/all.yml

The script can also be run directly (flags are an alternative to the env vars):

    ./inventory.py --target-host we-in.ru --target-ip 121.127.37.119

Emits a single group `target` whose host is the IP and whose vars carry the
domain (`host`), the IP (`ip`) and `app_dir`, so every playbook/group_vars
value derives from the command line.
"""
import json
import os
import re
import sys

HOST_PATTERN = re.compile(r'^[a-z0-9][a-z0-9.-]*$')


def _flag(name):
    argv = sys.argv[1:]
    if name not in argv:
        return None
    value_index = argv.index(name) + 1
    return argv[value_index] if value_index < len(argv) else None


host = os.environ.get('TARGET_HOST') or _flag('--target-host')
ip = os.environ.get('TARGET_IP') or _flag('--target-ip')

if not (host and ip):
    sys.exit('Set TARGET_HOST and TARGET_IP env vars (or --target-host/--target-ip).')

if not HOST_PATTERN.fullmatch(host):
    sys.exit(f'Invalid TARGET_HOST {host!r}: expected to match {HOST_PATTERN.pattern}')

print(json.dumps({
    'target': {
        'hosts': [ip],
        'vars': {'host': host, 'ip': ip, 'app_dir': f'/var/www/{host}'},
    },
    '_meta': {'hostvars': {ip: {}}},
}))
