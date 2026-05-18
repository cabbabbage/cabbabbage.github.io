import json
import shutil
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
CONTENT_PATH = ROOT / "resume-content.json"
OUTPUT_PATH = ROOT / "assets" / "Calvin_Mickelson_Resume_2026.pdf"
CONVENIENCE_COPY = Path.home() / "OneDrive" / "Documents" / "Calvin_Mickelson_Resume_2026_Web.pdf"

PAGE_W, PAGE_H = letter
MARGIN = 36
INK = colors.HexColor("#090909")
CHARCOAL = colors.HexColor("#171716")
ASH = colors.HexColor("#31312f")
SMOKE = colors.HexColor("#5f5f5a")
PAPER = colors.HexColor("#d8d8d3")
PAPER_DIM = colors.HexColor("#b6b6b0")
SIGNAL = colors.HexColor("#dfff35")
ELECTRIC = colors.HexColor("#66e7ff")
STRIKE = colors.HexColor("#ff4d2e")
LINK = INK


def load_content():
    return json.loads(CONTENT_PATH.read_text(encoding="utf-8"))


def set_font(pdf, name, size, fill=INK):
    pdf.setFillColor(fill)
    pdf.setFont(name, size)


def text_width(text, font, size):
    return stringWidth(text, font, size)


def wrap_text(text, font, size, max_width):
    words = str(text).split()
    lines = []
    line = ""
    for word in words:
        candidate = f"{line} {word}".strip()
        if text_width(candidate, font, size) <= max_width:
            line = candidate
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def draw_background(pdf):
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    pdf.setFillColor(colors.Color(0, 0, 0, alpha=0.028))
    pdf.rect(MARGIN - 12, MARGIN - 12, PAGE_W - ((MARGIN - 12) * 2), PAGE_H - ((MARGIN - 12) * 2), fill=1, stroke=0)

    pdf.saveState()
    pdf.setStrokeColor(colors.Color(0, 0, 0, alpha=0.11))
    pdf.setLineWidth(0.25)
    grid = 28
    x = MARGIN - 12
    while x <= PAGE_W - MARGIN + 12:
        pdf.line(x, MARGIN - 12, x, PAGE_H - MARGIN + 12)
        x += grid
    y = MARGIN - 12
    while y <= PAGE_H - MARGIN + 12:
        pdf.line(MARGIN - 12, y, PAGE_W - MARGIN + 12, y)
        y += grid
    pdf.restoreState()

    for x, y, color in (
        (PAGE_W - MARGIN - 18, PAGE_H - MARGIN + 2, SIGNAL),
        (PAGE_W - MARGIN - 54, PAGE_H - MARGIN - 32, ELECTRIC),
        (MARGIN + 22, MARGIN + 34, STRIKE),
        (MARGIN + 126, PAGE_H - MARGIN - 18, SIGNAL),
    ):
        pdf.setFillColor(color)
        pdf.circle(x, y, 1.7, fill=1, stroke=0)

    pdf.setStrokeColor(INK)
    pdf.setLineWidth(1.1)
    pdf.rect(MARGIN - 16, MARGIN - 16, PAGE_W - ((MARGIN - 16) * 2), PAGE_H - ((MARGIN - 16) * 2), fill=0, stroke=1)
    pdf.setStrokeColor(SIGNAL)
    pdf.setLineWidth(4)
    pdf.line(MARGIN - 11, MARGIN - 14, PAGE_W - MARGIN + 11, MARGIN - 14)
    pdf.setStrokeColor(STRIKE)
    pdf.line(MARGIN - 14, PAGE_H - 118, MARGIN - 14, PAGE_H - 36)


def draw_label(pdf, text, x, y, width=None):
    label_width = width or max(72, text_width(text, "Helvetica-Bold", 8) + 16)
    pdf.setFillColor(SIGNAL)
    pdf.rect(x, y - 11, label_width, 15, fill=1, stroke=0)
    pdf.setStrokeColor(INK)
    pdf.setLineWidth(1)
    pdf.rect(x, y - 11, label_width, 15, fill=0, stroke=1)
    set_font(pdf, "Helvetica-Bold", 8, INK)
    pdf.drawString(x + 7, y - 6.5, text.upper())
    return y - 23


def draw_rule(pdf, x, y, width):
    pdf.setStrokeColor(INK)
    pdf.setLineWidth(1)
    pdf.line(x, y, x + width, y)


def draw_wrapped(pdf, text, x, y, width, font="Helvetica", size=8.8, leading=11, fill=INK, bullet=False):
    bullet_indent = 10 if bullet else 0
    lines = wrap_text(text, font, size, width - bullet_indent)
    set_font(pdf, font, size, fill)
    for index, line in enumerate(lines):
        if bullet and index == 0:
            pdf.setFillColor(SIGNAL)
            pdf.rect(x, y - 4, 3.5, 3.5, fill=1, stroke=0)
        pdf.setFillColor(fill)
        pdf.drawString(x + bullet_indent, y, line)
        y -= leading
    return y


def draw_link(pdf, text, url, x, y, font="Helvetica-Bold", size=8.4, fill=LINK):
    set_font(pdf, font, size, fill)
    pdf.drawString(x, y, text)
    width = text_width(text, font, size)
    pdf.linkURL(url, (x, y - 2, x + width, y + size + 1), relative=0, thickness=0)
    return x + width


def draw_contact_link(pdf, label, value, url, x, y, width):
    set_font(pdf, "Helvetica-Bold", 7.1, INK)
    pdf.drawString(x, y, label.upper())
    label_width = text_width(label.upper(), "Helvetica-Bold", 7.1)
    value_x = x + label_width + 6
    set_font(pdf, "Helvetica-Bold", 8, ASH)
    pdf.drawString(value_x, y, value)
    pdf.linkURL(url, (x, y - 2, x + width, y + 9), relative=0, thickness=0)


def draw_contact_text(pdf, label, value, x, y, width, url=None):
    set_font(pdf, "Helvetica-Bold", 7.1, INK)
    pdf.drawString(x, y, label.upper())
    label_width = text_width(label.upper(), "Helvetica-Bold", 7.1)
    value_x = x + label_width + 6
    set_font(pdf, "Helvetica-Bold", 8, INK)
    pdf.drawString(value_x, y, value)
    if url:
        pdf.linkURL(url, (x, y - 2, x + width, y + 9), relative=0, thickness=0)


def draw_contact_block(pdf, content, y):
    col_gap = 22
    col_w = (PAGE_W - (MARGIN * 2) - (col_gap * 2)) / 3
    left = MARGIN
    middle = MARGIN + col_w + col_gap
    right = MARGIN + ((col_w + col_gap) * 2)

    band_y = y - 24
    band_h = 42
    pdf.setFillColor(colors.Color(0, 0, 0, alpha=0.07))
    pdf.rect(MARGIN, band_y, PAGE_W - (MARGIN * 2), band_h, fill=1, stroke=0)
    pdf.setStrokeColor(INK)
    pdf.setLineWidth(1)
    pdf.line(MARGIN, band_y, PAGE_W - MARGIN, band_y)
    pdf.setStrokeColor(colors.Color(0, 0, 0, alpha=0.18))
    pdf.setLineWidth(0.45)
    pdf.line(MARGIN, y - 3, PAGE_W - MARGIN, y - 3)
    pdf.line(middle - (col_gap / 2), band_y + 5, middle - (col_gap / 2), band_y + band_h - 5)
    pdf.line(right - (col_gap / 2), band_y + 5, right - (col_gap / 2), band_y + band_h - 5)
    pdf.setStrokeColor(ELECTRIC)
    pdf.setLineWidth(3)
    pdf.line(PAGE_W - MARGIN - 96, y + 19, PAGE_W - MARGIN, y + 19)

    draw_contact_text(pdf, "Email", content["email"], left + 2, y + 2, col_w, f"mailto:{content['email']}")
    draw_contact_text(pdf, "Phone", content["phone"], middle + 2, y + 2, col_w)
    draw_contact_text(pdf, "Location", content["location"], right + 2, y + 2, col_w)

    y -= 15
    draw_contact_link(pdf, "GitHub", content["github"]["label"], content["github"]["url"], left + 2, y, col_w)
    draw_contact_link(pdf, "LinkedIn", content["linkedin"]["label"], content["linkedin"]["url"], middle + 2, y, col_w)
    draw_contact_link(pdf, "Portfolio", content["portfolio"]["label"], content["portfolio"]["url"], right + 2, y, col_w)
    return y - 22


def draw_header(pdf, content, page_num):
    draw_background(pdf)
    if page_num == 1:
        panel_x = PAGE_W - 174
        panel_w = 138
        pdf.setFillColor(INK)
        pdf.rect(MARGIN, PAGE_H - 112, PAGE_W - (MARGIN * 2), 76, fill=1, stroke=0)
        pdf.setFillColor(PAPER_DIM)
        pdf.rect(panel_x, PAGE_H - 112, panel_w, 76, fill=1, stroke=0)
        pdf.setFillColor(STRIKE)
        pdf.rect(MARGIN, PAGE_H - 112, 8, 76, fill=1, stroke=0)
        pdf.setFillColor(SIGNAL)
        pdf.rect(MARGIN, PAGE_H - 112, PAGE_W - (MARGIN * 2), 5, fill=1, stroke=0)
        pdf.setStrokeColor(PAPER)
        pdf.setLineWidth(0.8)
        pdf.rect(MARGIN + 10, PAGE_H - 102, panel_x - MARGIN - 20, 56, fill=0, stroke=1)
        pdf.rect(panel_x + 14, PAGE_H - 102, panel_w - 28, 56, fill=0, stroke=1)
        set_font(pdf, "Helvetica-Bold", 27, PAPER)
        pdf.drawString(MARGIN + 20, PAGE_H - 68, content["name"].upper())
        set_font(pdf, "Helvetica-Bold", 13, SIGNAL)
        pdf.drawString(MARGIN + 20, PAGE_H - 90, content["title"].upper())
        set_font(pdf, "Helvetica-Bold", 10.2, INK)
        pdf.drawString(panel_x + 28, PAGE_H - 68, "PROJECT")
        pdf.drawString(panel_x + 28, PAGE_H - 84, "RESUME")
        set_font(pdf, "Helvetica-Bold", 7.6, INK)
        pdf.drawString(panel_x + 28, PAGE_H - 98, "2026 / PDF")
        y = PAGE_H - 128
    else:
        pdf.setFillColor(INK)
        pdf.rect(MARGIN, PAGE_H - 70, PAGE_W - (MARGIN * 2), 34, fill=1, stroke=0)
        pdf.setFillColor(STRIKE)
        pdf.rect(MARGIN, PAGE_H - 70, 7, 34, fill=1, stroke=0)
        pdf.setStrokeColor(SIGNAL)
        pdf.setLineWidth(3)
        pdf.line(MARGIN, PAGE_H - 36, PAGE_W - MARGIN, PAGE_H - 36)
        set_font(pdf, "Helvetica-Bold", 15, PAPER)
        pdf.drawString(MARGIN + 12, PAGE_H - 57, content["name"].upper())
        set_font(pdf, "Helvetica-Bold", 9, SIGNAL)
        pdf.drawRightString(PAGE_W - MARGIN - 12, PAGE_H - 57, f"{content['title']} / PAGE {page_num}")
        y = PAGE_H - 88

    return draw_contact_block(pdf, content, y)


def draw_summary(pdf, content, y):
    y = draw_label(pdf, "Summary", MARGIN, y, 86)
    return draw_wrapped(pdf, content["summary"], MARGIN, y, PAGE_W - (MARGIN * 2), "Helvetica-Bold", 9.1, 12)


def draw_skills(pdf, content, y):
    y -= 10
    y = draw_label(pdf, "Technical Skills", MARGIN, y, 118)
    col_w = (PAGE_W - (MARGIN * 2) - 18) / 3
    x = MARGIN
    for label, items in content["skills"].items():
        set_font(pdf, "Helvetica-Bold", 8.2, INK)
        pdf.drawString(x, y, label.upper())
        draw_rule(pdf, x, y - 4, col_w - 4)
        draw_wrapped(pdf, ", ".join(items), x, y - 16, col_w - 4, "Helvetica", 7.9, 9.6, ASH)
        x += col_w + 9
    return y - 72


def draw_project(pdf, project, x, y, width, max_bullets=None):
    title_width = min(width * 0.62, text_width(project["title"], "Helvetica-Bold", 10.4) + 18)
    stack_x = x + title_width + 14
    stack_width = width - title_width - 14

    set_font(pdf, "Helvetica-Bold", 10.4, INK)
    pdf.drawString(x, y, project["title"])
    pdf.linkURL(project["url"], (x, y - 2, x + text_width(project["title"], "Helvetica-Bold", 10.4), y + 11), relative=0, thickness=0)
    set_font(pdf, "Helvetica-Bold", 7.6, SMOKE)
    pdf.drawRightString(stack_x + stack_width, y, project["stack"])
    y -= 9
    draw_rule(pdf, x, y + 3, title_width)
    y -= 7
    bullets = project["bullets"][:max_bullets] if max_bullets else project["bullets"]
    for bullet in bullets:
        y = draw_wrapped(pdf, bullet, x, y, width, "Helvetica", 8.15, 10.3, INK, bullet=True)
        y -= 2
    return y - 6


def draw_projects_page_one(pdf, content, y):
    y -= 4
    y = draw_label(pdf, "Selected Projects", MARGIN, y, 126)
    project_limits = {
        "ENGINE 2.0 / VIBBLE Engine": 3,
        "auto_edit": 2,
        "ASL Interpretation Model": 2,
        "SSH_MAVLINK": 2
    }
    for project in content["projects"][:4]:
        y = draw_project(pdf, project, MARGIN, y, PAGE_W - (MARGIN * 2), project_limits.get(project["title"]))
    return y


def draw_experience(pdf, content, y):
    y -= 4
    y = draw_label(pdf, "Experience", MARGIN, y, 94)
    for job in content["experience"]:
        set_font(pdf, "Helvetica-Bold", 10, INK)
        pdf.drawString(MARGIN, y, f"{job['company']} - {job['role']}")
        set_font(pdf, "Helvetica-Bold", 7.8, SMOKE)
        pdf.drawRightString(PAGE_W - MARGIN, y, job["dates"])
        y -= 11
        set_font(pdf, "Helvetica", 7.8, SMOKE)
        pdf.drawString(MARGIN, y, job["location"])
        y -= 11
        for bullet in job["bullets"]:
            y = draw_wrapped(pdf, bullet, MARGIN, y, PAGE_W - (MARGIN * 2), "Helvetica", 8.2, 10.4, INK, bullet=True)
            y -= 2
        y -= 5
    return y


def draw_education(pdf, content, y):
    y -= 4
    y = draw_label(pdf, "Education", MARGIN, y, 88)
    education = content["education"]
    set_font(pdf, "Helvetica-Bold", 10, INK)
    pdf.drawString(MARGIN, y, f"{education['school']} - {education['degree']}")
    set_font(pdf, "Helvetica-Bold", 7.8, SMOKE)
    pdf.drawRightString(PAGE_W - MARGIN, y, education["dates"])
    y -= 12
    set_font(pdf, "Helvetica", 7.8, SMOKE)
    pdf.drawString(MARGIN, y, education["location"])
    y -= 12
    return draw_wrapped(pdf, education["details"], MARGIN, y, PAGE_W - (MARGIN * 2), "Helvetica", 8.2, 10.4)


def build_pdf():
    content = load_content()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT_PATH), pagesize=letter)
    pdf.setTitle(f"{content['name']} Resume")
    pdf.setAuthor(content["name"])
    pdf.setSubject(content["title"])

    y = draw_header(pdf, content, 1)
    y = draw_summary(pdf, content, y)
    y = draw_skills(pdf, content, y)
    draw_projects_page_one(pdf, content, y)
    pdf.showPage()

    y = draw_header(pdf, content, 2)
    smile_scope = next(project for project in content["projects"] if project["title"] == "SmileScope")
    y = draw_label(pdf, "Selected Project", MARGIN, y, 118)
    y = draw_project(pdf, smile_scope, MARGIN, y, PAGE_W - (MARGIN * 2))
    y = draw_experience(pdf, content, y)
    draw_education(pdf, content, y)
    pdf.save()

    shutil.copyfile(OUTPUT_PATH, CONVENIENCE_COPY)
    print(f"Wrote {OUTPUT_PATH}")
    print(f"Wrote {CONVENIENCE_COPY}")


if __name__ == "__main__":
    build_pdf()
