from io import BytesIO
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
import os

def get_font_path():
    # Assuming models/ is the current directory for this file
    return os.path.join(os.path.dirname(__file__), 'Adam.ttf')

def add_details_to_certificate(input_pdf, output_pdf, seller_name, product_name, product_id, ect_no, hash_no):
    pdf_reader = PdfReader(input_pdf)
    pdf_writer = PdfWriter()
    page = pdf_reader.pages[0]

    packet = BytesIO()
    canvas_obj = canvas.Canvas(packet)

    font_path = get_font_path()
    pdfmetrics.registerFont(TTFont('Adam', font_path))
    canvas_obj.setFont("Adam", 20)
    canvas_obj.setFillColorRGB(0.0, 0.5, 0.5)

    canvas_obj.drawString(200, 300, f"Seller: {seller_name}")
    canvas_obj.drawString(255, 260, f"{product_id}")
    canvas_obj.drawString(100, 230, f"{product_name}")
    canvas_obj.drawString(330, 205, f"{ect_no}")
    canvas_obj.drawString(390, 170, f"{hash_no}")

    canvas_obj.save()
    packet.seek(0)

    overlay_reader = PdfReader(packet)
    overlay_page = overlay_reader.pages[0]
    page.merge_page(overlay_page)
    pdf_writer.add_page(page)

    for page in pdf_reader.pages[1:]:
        pdf_writer.add_page(page)

    with open(output_pdf, 'wb') as output_file:
        pdf_writer.write(output_file)

    print("Product certificate generated.")

def add_seller_details_to_certificate(input_pdf, output_pdf, seller_name, seller_id):
    pdf_reader = PdfReader(input_pdf)
    pdf_writer = PdfWriter()
    page = pdf_reader.pages[0]

    packet = BytesIO()
    canvas_obj = canvas.Canvas(packet)

    font_path = get_font_path()
    pdfmetrics.registerFont(TTFont('Adam', font_path))
    canvas_obj.setFont("Adam", 36)
    canvas_obj.setFillColorRGB(1.0, 0.84, 0.0)

    canvas_obj.drawString(240, 280, f"Seller: {seller_name}")
    canvas_obj.setFont("Adam", 20)
    canvas_obj.drawString(470, 240, f"{seller_id}")

    canvas_obj.save()
    packet.seek(0)

    overlay_reader = PdfReader(packet)
    overlay_page = overlay_reader.pages[0]
    page.merge_page(overlay_page)
    pdf_writer.add_page(page)

    for page in pdf_reader.pages[1:]:
        pdf_writer.add_page(page)

    with open(output_pdf, 'wb') as output_file:
        pdf_writer.write(output_file)

    print("Seller certificate generated.")
