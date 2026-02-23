import sys
import os

try:
    import pypdf
except ImportError:
    print("pypdf not installed.")

try:
    import pandas as pd
except ImportError:
    print("pandas not installed.")

def extract_pdf(file_path):
    text = ""
    try:
        from pypdf import PdfReader
        reader = PdfReader(file_path)
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        return f"Error reading PDF: {e}"

def extract_xlsx(file_path):
    try:
        import pandas as pd
        df = pd.read_excel(file_path)
        return df.to_string()
    except Exception as e:
        return f"Error reading XLSX: {e}"

resources_dir = r"c:\Users\norin\Documents\GitHub\Effects of sleep website\resources"
files = os.listdir(resources_dir)

with open("extracted_data.txt", "w", encoding="utf-8") as f:
    for filename in files:
        path = os.path.join(resources_dir, filename)
        if filename.endswith(".pdf"):
            f.write(f"--- {filename} ---\n")
            f.write(extract_pdf(path) + "\n...\n")
        elif filename.endswith(".xlsx"):
            f.write(f"--- {filename} ---\n")
            f.write(extract_xlsx(path) + "\n...\n")
