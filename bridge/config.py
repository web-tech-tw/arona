"""
matrix-line-bridge
(c) 2021 SuperSonic (https://github.com/supersonictw)
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""
import configparser

config_file_path = "config.ini"


def read() -> dict:
    config = configparser.ConfigParser()
    config.read(config_file_path)
    return config
