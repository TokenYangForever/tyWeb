#!/bin/bash
echo $1 | tr "\t| " "\n" | sort -r | tr "\n| " "\t" 
