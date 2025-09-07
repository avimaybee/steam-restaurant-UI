#!/bin/bash
if curl -s http://localhost:8000/landing-page.html | grep -q "Where Culinary Artistry Meets Asian Tradition"; then
    echo "Test passed: landing-page.html contains expected content."
else
    echo "Test failed: landing-page.html does not contain expected content."
fi
