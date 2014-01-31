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
date_time_err = np.array(d[11:15], dtype=float)
w = 0.3

x = np.arange(4)
xt = ['0', '1-2', '3-6', '7-8']


################

users_gender = plot.figure(10, figsize=(5, 6), dpi=80)
#users.subplots_adjust(bottom=0.33)

plot.bar(0.2, 15, width=w/3, label='Man', hatch='\\', fill=False, edgecolor='black', align='center')
plot.bar(0.4, 3, width=w/3, label='Woman',  hatch='.', fill=False, edgecolor='black', align='center')

#plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks([0, 0.2, 0.4, 0.6], ['', 'Man', 'Woman', ''], fontsize=15)
plot.yticks(fontsize=15)

plot.xlabel('Gender', fontsize=20)
plot.ylabel('The number of persons', fontsize=20)
plot.savefig('data/users_gender.pdf')
#plot.show()

################

users_age = plot.figure(11, figsize=(5, 6), dpi=80)
#users.subplots_adjust(bottom=0.33)

plot.bar(0.5, 0, width=w*2, label='-19', hatch='\\', fill=False, edgecolor='black', align='center')
plot.bar(1.5, 12, width=w*2, label='20-29',  hatch='.', fill=False, edgecolor='black', align='center')
plot.bar(2.5, 2, width=w*2, label='30-39',  hatch='/', fill=False, edgecolor='black', align='center')
plot.bar(3.5, 1, width=w*2, label='40-49',  hatch='*', fill=False, edgecolor='black', align='center')
plot.bar(4.5, 0, width=w*2, label='50-',  hatch='-', fill=False, edgecolor='black', align='center')

#plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks([0, 0.5, 1.5, 2.5, 3.5, 4.5, 5], ['', '-19', '20-29', '30-39', '40-49', '50-', ''], fontsize=15)
plot.yticks(fontsize=15)

plot.xlabel('Age', fontsize=20)
plot.ylabel('The number of persons', fontsize=20)
plot.savefig('data/users_age.pdf')
#plot.show()

################

users_tweet = plot.figure(12, figsize=(5, 6), dpi=80)
#users.subplots_adjust(bottom=0.33)

plot.bar(0.5, 1, width=w*2, label='0-1', hatch='\\', fill=False, edgecolor='black', align='center')
plot.bar(1.5, 6, width=w*2, label='2-10',  hatch='.', fill=False, edgecolor='black', align='center')
plot.bar(2.5, 6, width=w*2, label='11-50',  hatch='/', fill=False, edgecolor='black', align='center')
plot.bar(3.5, 1, width=w*2, label='51-100',  hatch='*', fill=False, edgecolor='black', align='center')
plot.bar(4.5, 1, width=w*2, label='101-',  hatch='-', fill=False, edgecolor='black', align='center')

#plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks([0, 0.5, 1.5, 2.5, 3.5, 4.5, 5], ['', '0-1', '2-10', '11-50', '51-100', '101-', ''], fontsize=15)
plot.yticks(fontsize=15)

plot.xlabel('Tweets / Day', fontsize=20)
plot.ylabel('The number of persons', fontsize=20)
plot.savefig('data/users_tweet.pdf')
#plot.show()

################

fig_manual_vs_pin_rate = plot.figure(1, figsize=(12, 6), dpi=80)
fig_manual_vs_pin_rate.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_rate[:,2], width=w, label='Manual Mode', hatch='\\', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_rate[:,3], width=w, label='PIN Mode',  hatch='.', fill=False, edgecolor='black', align='center')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt, fontsize=15)
plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], fontsize=15)

plot.xlabel('Days passed since set up', fontsize=20)
plot.ylabel('Success (%)', fontsize=20)
plot.savefig('data/ex_manual_vs_pin_rate.pdf')
#plot.show()

#################

fig_manual_vs_pin_time = plot.figure(2, figsize=(12, 6), dpi=80)
fig_manual_vs_pin_time.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_time[:,2], width=w, label='Manual Mode', hatch='\\', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_time[:,3], width=w, label='PIN Mode',  hatch='.', fill=False, edgecolor='black', align='center')
plot.errorbar(x - w/2, date_time[:,2], date_time_err[:,2], fmt='.')
plot.errorbar(x + w/2, date_time[:,3], date_time_err[:,3], fmt='.')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt, fontsize=15)
plot.yticks(fontsize=15)
#plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

plot.xlabel('Days passed since set up', fontsize=20)
plot.ylabel('Time (seconds)', fontsize=20)
plot.savefig('data/ex_manual_vs_pin_time.pdf')
plot.show()

################

fig_auto_term_vs_pin_rate = plot.figure(3, figsize=(12, 6), dpi=80)
fig_auto_term_vs_pin_rate.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_rate[:,0], width=w, label='Auto Mode Type Term', hatch='/', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_rate[:,3], width=w, label='PIN Mode',  hatch='.', fill=False, edgecolor='black', align='center')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt, fontsize=15)
plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], fontsize=15)

plot.xlabel('Days passed since set up', fontsize=20)
plot.ylabel('Success (%)', fontsize=20)
plot.savefig('data/ex_auto_term_vs_pin_rate.pdf')
#plot.show()

#################

fig_auto_term_vs_pin_time = plot.figure(4, figsize=(12, 6), dpi=80)
fig_auto_term_vs_pin_time.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_time[:,0], width=w, label='Auto Mode Type Term', hatch='/', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_time[:,3], width=w, label='PIN Mode',  hatch='.', fill=False, edgecolor='black', align='center')
plot.errorbar(x - w/2, date_time[:,0], date_time_err[:,0], fmt='.')
plot.errorbar(x + w/2, date_time[:,3], date_time_err[:,3], fmt='.')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt, fontsize=15)
plot.yticks(fontsize=15)
#plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

plot.xlabel('Days passed since set up', fontsize=20)
plot.ylabel('Time (seconds)', fontsize=20)
plot.savefig('data/ex_auto_term_vs_pin_time.pdf')
#plot.show()

################

fig_auto_cycle_vs_pin_rate = plot.figure(5, figsize=(12, 6), dpi=80)
fig_auto_cycle_vs_pin_rate.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_rate[:,1], width=w, label='Auto Mode Type Cycle', hatch='-', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_rate[:,3], width=w, label='PIN Mode',  hatch='.', fill=False, edgecolor='black', align='center')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt, fontsize=15)
plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], fontsize=15)

plot.xlabel('Days passed since set up', fontsize=20)
plot.ylabel('Success (%)', fontsize=20)
plot.savefig('data/ex_auto_cycle_vs_pin_rate.pdf')
#plot.show()

#################

fig_auto_cycle_vs_pin_time = plot.figure(6, figsize=(12, 6), dpi=80)
fig_auto_cycle_vs_pin_time.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_time[:,1], width=w, label='Auto Mode Type Cycle', hatch='-', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_time[:,3], width=w, label='PIN Mode',  hatch='.', fill=False, edgecolor='black', align='center')
plot.errorbar(x - w/2, date_time[:,1], date_time_err[:,1], fmt='.')
plot.errorbar(x + w/2, date_time[:,3], date_time_err[:,3], fmt='.')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt, fontsize=15)
plot.yticks(fontsize=15)
#plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

plot.xlabel('Days passed since set up', fontsize=20)
plot.ylabel('Time (seconds)', fontsize=20)
plot.savefig('data/ex_auto_cycle_vs_pin_time.pdf')
#plot.show()

#################

fig_auto_term_vs_auto_cycle_rate = plot.figure(7, figsize=(12, 6), dpi=80)
fig_auto_term_vs_auto_cycle_rate.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_rate[:,0], width=w, label='Auto Mode Type Term', hatch='/', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_rate[:,1], width=w, label='Auto Mode Type Cycle', hatch='-', fill=False, edgecolor='black', align='center')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt, fontsize=15)
plot.yticks(fontsize=15)
#plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

plot.xlabel('Days passed since set up', fontsize=20)
plot.ylabel('Success (%)', fontsize=20)
plot.savefig('data/ex_auto_term_vs_auto_cycle_rate.pdf')
#plot.show()

#################

fig_auto_term_vs_auto_cycle_time = plot.figure(8, figsize=(12, 6), dpi=80)
fig_auto_term_vs_auto_cycle_time.subplots_adjust(bottom=0.33)

plot.bar(x - w/2, date_time[:,0], width=w, label='Auto Mode Type Term', hatch='/', fill=False, edgecolor='black', align='center')
plot.bar(x + w/2, date_time[:,1], width=w, label='Auto Mode Type Cycle', hatch='-', fill=False, edgecolor='black', align='center')
plot.errorbar(x - w/2, date_time[:,0], date_time_err[:,0], fmt='.')
plot.errorbar(x + w/2, date_time[:,1], date_time_err[:,1], fmt='.')

plot.legend(bbox_to_anchor=(0.5, -0.5), loc='lower center', borderaxespad=0, fancybox=True)
plot.xticks(x, xt, fontsize=15)
plot.yticks(fontsize=15)
#plot.yticks(np.arange(0, 1.1, 0.1), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

plot.xlabel('Days passed since set up', fontsize=20)
plot.ylabel('Time (seconds)', fontsize=20)
plot.savefig('data/ex_auto_term_vs_auto_cycle_time.pdf')
#plot.show()
