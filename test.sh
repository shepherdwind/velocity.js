#!/bin/sh
jison velocity.yy velocity.l
node velocity.js tmp.vm
