#!/bin/bash
echo "Enter principal amount:"
read principal
echo "Enter rate of interest:"
read rate
echo "Enter time period (in years):"
read time

simple_interest=$(echo "$principal * $rate * $time / 100" | bc)
echo "Simple Interest: $simple_interest"
