# Website Purpose

working on a website for waazam and its streaming protocol

See waazam.com

The streaming protocol connects two home computers directly to exchange video, depth, audio, and OSC messages. The two users just have to be Gchat contacts or connected through another similar chat service.

We want to share this streaming protocol to help others make creative applications with it. Hence the website.

# Development Notes

Make sure you have the Python dependencies listed in requirements.txt.

Command line steps to run your own local version

    git clone https://github.com/Noura/ofStreamer-website.git
    cd ofStreamer-website
    python make_pages.py
    cd to-deploy
    python -m SimpleHTTPServer

Then in your web browser navigate to http://localhost:8000
