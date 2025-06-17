

from io import BytesIO
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

def add_details_to_certificate(input_pdf, output_pdf, seller_name, product_name,product_id, ect_no, hash_no):
    pdf_reader = PdfReader(input_pdf)
    pdf_writer = PdfWriter()
    page = pdf_reader.pages[0]

    packet = BytesIO()
    canvas_obj = canvas.Canvas(packet)

    # Register custom font
    custom_font_path = "Adam.ttf"  # Make sure this file exists
    pdfmetrics.registerFont(TTFont('Adam', custom_font_path))

    # Set styles
    canvas_obj.setFont("Adam", 20)
    canvas_obj.setFillColorRGB(0.0, 0.5, 0.5)  # Example color (teal)

    # Customize these coordinates to fit the layout of your certificate
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

    print("Certificate updated with product details!")

# Example call
# add_details_to_certificate(
#     "template-p.pdf",
#     "output_certificate.pdf",
#     seller_name="Anas Traders",
#     product_name="Eco-Friendly Smart Light",
#     product_id="XXX",
#     ect_no="ECT-2025-91823",
#     hash_no="7FA1D2B3E900A9"
# )


def add_seller_details_to_certificate(input_pdf, output_pdf, seller_name, seller_id):
    pdf_reader = PdfReader(input_pdf)
    pdf_writer = PdfWriter()

    # Access the first page
    page = pdf_reader.pages[0]

    # Create a BytesIO buffer to store the overlay
    packet = BytesIO()
    canvas_obj = canvas.Canvas(packet)

    # Load custom font
    custom_font_path = "Adam.ttf"  # Make sure this file is in the directory
    pdfmetrics.registerFont(TTFont('Adam', custom_font_path))

    # Set font and size
    font_name = "Adam"
    font_size = 36
    canvas_obj.setFont(font_name, font_size)
    canvas_obj.setFillColorRGB(1.0, 0.84, 0.0)  # Gold color

    # Draw seller name and ID
    canvas_obj.drawString(240, 280, f"Seller: {seller_name}")
    font_size = 20
    canvas_obj.setFont(font_name, font_size)
    canvas_obj.setFillColorRGB(1.0, 0.84, 0.0)  # Gold color
    canvas_obj.drawString(470, 240, f"{seller_id}")

    canvas_obj.save()
    packet.seek(0)

    # Merge the overlay with the certificate
    overlay_reader = PdfReader(packet)
    overlay_page = overlay_reader.pages[0]
    page.merge_page(overlay_page)
    pdf_writer.add_page(page)

    # Add remaining pages unchanged
    for page in pdf_reader.pages[1:]:
        pdf_writer.add_page(page)

    # Save the modified PDF
    with open(output_pdf, 'wb') as output_file:
        pdf_writer.write(output_file)

    print("Certificate completed with Seller Details!")


# Example usage:
add_seller_details_to_certificate(
    input_pdf="template-s.pdf",
    output_pdf="seller_certificate.pdf",
    seller_name="Anas Traders",
    seller_id="SELL-2025-84729"
)

# from io import BytesIO
# from PyPDF2 import PdfReader, PdfWriter
# from reportlab.pdfbase import pdfmetrics
# from reportlab.pdfbase.ttfonts import TTFont
# from reportlab.pdfgen import canvas


# def wrap_text(canvas_obj, text, font_name, font_size, max_width):
#     """
#     Splits a long string into multiple lines that fit within max_width.
#     Returns a list of lines.
#     """
#     words = text.split()
#     lines = []
#     line = ""
#     for word in words:
#         test_line = f"{line} {word}".strip()
#         if pdfmetrics.stringWidth(test_line, font_name, font_size) <= max_width:
#             line = test_line
#         else:
#             lines.append(line)
#             line = word
#     if line:
#         lines.append(line)
#     return lines


# def add_details_to_certificate(input_pdf, output_pdf, seller_name, product_name, product_id, ect_no, hash_no):
#     pdf_reader = PdfReader(input_pdf)
#     pdf_writer = PdfWriter()
#     page = pdf_reader.pages[0]

#     packet = BytesIO()
#     canvas_obj = canvas.Canvas(packet)

#     font_path = "Adam.ttf"
#     font_name = "Adam"
#     pdfmetrics.registerFont(TTFont(font_name, font_path))

#     canvas_obj.setFont(font_name, 20)
#     canvas_obj.setFillColorRGB(0.0, 0.5, 0.5)

#     # Set max text width (adjust according to your template layout)
#     max_width = 300

#     # Draw seller
#     lines = wrap_text(canvas_obj, f"Seller: {seller_name}", font_name, 20, max_width)
#     y = 300
#     for line in lines:
#         canvas_obj.drawString(200, y, line)
#         y -= 22

#     # Product ID, Product Name, ECT No, Hash (these assumed to be short — wrap if needed)
#     canvas_obj.drawString(255, 260, product_id)

#     lines = wrap_text(canvas_obj, product_name, font_name, 20, max_width)
#     y = 230
#     for line in lines:
#         canvas_obj.drawString(100, y, line)
#         y -= 22

#     canvas_obj.drawString(330, 205, ect_no)
#     canvas_obj.drawString(390, 170, hash_no)

#     canvas_obj.save()
#     packet.seek(0)

#     overlay_reader = PdfReader(packet)
#     overlay_page = overlay_reader.pages[0]
#     page.merge_page(overlay_page)
#     pdf_writer.add_page(page)

#     for page in pdf_reader.pages[1:]:
#         pdf_writer.add_page(page)

#     with open(output_pdf, 'wb') as output_file:
#         pdf_writer.write(output_file)

#     print("Product certificate updated!")


# def add_seller_details_to_certificate(input_pdf, output_pdf, seller_name, seller_id):
#     pdf_reader = PdfReader(input_pdf)
#     pdf_writer = PdfWriter()
#     page = pdf_reader.pages[0]

#     packet = BytesIO()
#     canvas_obj = canvas.Canvas(packet)

#     font_path = "Adam.ttf"
#     font_name = "Adam"
#     pdfmetrics.registerFont(TTFont(font_name, font_path))

#     canvas_obj.setFont(font_name, 36)
#     canvas_obj.setFillColorRGB(1.0, 0.84, 0.0)

#     # Wrap seller name
#     seller_lines = wrap_text(canvas_obj, f"Seller: {seller_name}", font_name, 36, 300)
#     y = 280
#     for line in seller_lines:
#         canvas_obj.drawString(240, y, line)
#         y -= 30

#     # Seller ID (should fit, but wrap anyway)
#     canvas_obj.setFont(font_name, 24)
#     id_lines = wrap_text(canvas_obj, f"ID: {seller_id}", font_name, 24, 250)
#     y = 240
#     for line in id_lines:
#         canvas_obj.drawString(470, y, line)
#         y -= 24

#     canvas_obj.save()
#     packet.seek(0)

#     overlay_reader = PdfReader(packet)
#     overlay_page = overlay_reader.pages[0]
#     page.merge_page(overlay_page)
#     pdf_writer.add_page(page)

#     for page in pdf_reader.pages[1:]:
#         pdf_writer.add_page(page)

#     with open(output_pdf, 'wb') as output_file:
#         pdf_writer.write(output_file)

#     print("Seller certificate completed!")

