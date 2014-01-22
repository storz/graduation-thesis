#!/usr/local/bin python3
# -*- coding: utf-8 -*-
import sys
import matplotlib.pyplot as plot
import numpy as np
import csv

d = [];
with open('./data/graphData.csv', 'r') as f:
	reader = csv.reader(f)
	for row in reader:
		d.append(row)

date_rate = np.array(d[1:5], dtype=float)
date_time = np.array(d[6:10], dtype=float)
w = 0.3

x = np.arange(4)
xt = ['0', '1~2', '3~6', '7~8']

################

fig_manual_vs_pin_rate = plot.figure(1, figsize=(12, 6), dpi=80)
fig_manual_vs_pin_rate.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_rate[:,2], width=w, label='Manual Mode', hatch='\\', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_rate[:,3], width=w, label='PIN Mode',  hatch='.', fill=False, edgecolor='black', align='center')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt)
plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

plot.xlabel('Days passed since set up')
plot.ylabel('Success (%)')
plot.savefig('data/ex_manual_vs_pin_rate.pdf')
#plot.show()

#################

fig_manual_vs_pin_time = plot.figure(2, figsize=(12, 6), dpi=80)
fig_manual_vs_pin_time.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_time[:,2], width=w, label='Manual Mode', hatch='\\', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_time[:,3], width=w, label='PIN Mode',  hatch='.', fill=False, edgecolor='black', align='center')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt)
#plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

plot.xlabel('Days passed since set up')
plot.ylabel('Time (seconds)')
plot.savefig('data/ex_manual_vs_pin_time.pdf')
#plot.show()

################

fig_auto_term_vs_pin_rate = plot.figure(3, figsize=(12, 6), dpi=80)
fig_auto_term_vs_pin_rate.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_rate[:,0], width=w, label='Auto Mode Type Term', hatch='/', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_rate[:,3], width=w, label='PIN Mode',  hatch='.', fill=False, edgecolor='black', align='center')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt)
plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

plot.xlabel('Days passed since set up')
plot.ylabel('Success (%)')
plot.savefig('data/ex_auto_term_vs_pin_rate.pdf')
#plot.show()

#################

fig_auto_term_vs_pin_time = plot.figure(4, figsize=(12, 6), dpi=80)
fig_auto_term_vs_pin_time.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_time[:,0], width=w, label='Auto Mode Type Term', hatch='/', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_time[:,3], width=w, label='PIN Mode',  hatch='.', fill=False, edgecolor='black', align='center')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt)
#plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

plot.xlabel('Days passed since set up')
plot.ylabel('Time (seconds)')
plot.savefig('data/ex_auto_term_vs_pin_time.pdf')
#plot.show()

################

fig_auto_cycle_vs_pin_rate = plot.figure(5, figsize=(12, 6), dpi=80)
fig_auto_cycle_vs_pin_rate.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_rate[:,1], width=w, label='Auto Mode Type Cycle', hatch='-', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_rate[:,3], width=w, label='PIN Mode',  hatch='.', fill=False, edgecolor='black', align='center')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt)
plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

plot.xlabel('Days passed since set up')
plot.ylabel('Success (%)')
plot.savefig('data/ex_auto_cycle_vs_pin_rate.pdf')
#plot.show()

#################

fig_auto_cycle_vs_pin_rate = plot.figure(6, figsize=(12, 6), dpi=80)
fig_auto_cycle_vs_pin_rate.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_time[:,1], width=w, label='Auto Mode Type Cycle', hatch='-', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_time[:,3], width=w, label='PIN Mode',  hatch='.', fill=False, edgecolor='black', align='center')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt)
#plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

plot.xlabel('Days passed since set up')
plot.ylabel('Time (seconds)')
plot.savefig('data/ex_auto_cycle_vs_pin_time.pdf')
#plot.show()

#################

fig_auto_term_vs_auto_cycle_rate = plot.figure(7, figsize=(12, 6), dpi=80)
fig_auto_term_vs_auto_cycle_rate.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_rate[:,0], width=w, label='Auto Mode Type Term', hatch='/', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_rate[:,1], width=w, label='Auto Mode Type Cycle', hatch='-', fill=False, edgecolor='black', align='center')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt)
#plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

plot.xlabel('Days passed since set up')
plot.ylabel('Success (%)')
plot.savefig('data/ex_auto_term_vs_auto_cycle_rate.pdf')
#plot.show()

#################

fig_auto_term_vs_auto_cycle_time = plot.figure(8, figsize=(12, 6), dpi=80)
fig_auto_term_vs_auto_cycle_time.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_time[:,0], width=w, label='Auto Mode Type Term', hatch='/', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_time[:,1], width=w, label='Auto Mode Type Cycle', hatch='-', fill=False, edgecolor='black', align='center')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt)
#plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

plot.xlabel('Days passed since set up')
plot.ylabel('Time (seconds)')
plot.savefig('data/ex_auto_term_vs_auto_cycle_time.pdf')
#plot.show()
