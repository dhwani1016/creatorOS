import http.server
import socketserver
import webbrowser
import threading
import time
import os
import sys

DEFAULT_PORT = 8000

def find_free_port(start_port):
    """Scan and find a free port on localhost to avoid address in use errors."""
    import socket
    port = start_port
    while True:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(('localhost', port))
                return port
            except OSError:
                port += 1

def open_browser(url):
    """Open the web browser to the server URL after a brief delay to ensure server startup."""
    time.sleep(0.8)
    print(f"\n[System] Launching browser: {url}")
    webbrowser.open(url)

def main():
    # Make sure we serve from the directory containing this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    port = find_free_port(DEFAULT_PORT)
    url = f"http://localhost:{port}"

    # Setup the HTTP request handler
    handler = http.server.SimpleHTTPRequestHandler

    # Launch browser thread to avoid blocking server start
    browser_thread = threading.Thread(target=open_browser, args=(url,))
    browser_thread.daemon = True
    browser_thread.start()

    print("=" * 60)
    print("   ViralFlow: Social Media Content Analyzer & Script Generator")
    print("=" * 60)
    print(f"[Status] Local server running at: {url}")
    print(f"[Path] Serving files from: {script_dir}")
    print("[Control] Press CTRL+C in this terminal window to stop the server.")
    print("=" * 60)

    try:
        with socketserver.TCPServer(('localhost', port), handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[Status] Server shut down clean. Goodbye!")
        sys.exit(0)
    except Exception as e:
        print(f"\n[Error] Could not start server: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
