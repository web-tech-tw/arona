"""
matrix-line-bridge
(c) 2021 SuperSonic (https://github.com/supersonictw)
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""

from threading import Thread

from bridge.line import run as line_run
from bridge.matrix import run as matrix_run

if __name__ == "__main__":
    pool = []

    pool.append(
        Thread(name=line_run.__name__, target=line_run),
        Thread(name=matrix_run.__name__, target=matrix_run)
    )

    for task in pool:
        task.start()

    for task in pool:
        task.join()
