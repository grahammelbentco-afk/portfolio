"""Low-poly wireframe: a physio assessing a bent knee. Patient's leg lies left to right on a
table with the knee raised; one hand cups the knee from above, the other supports the calf.
Shapes are built along bone axes with real proportions, filled with jittered points and
Delaunay-triangulated (Bowyer-Watson). Writes an SVG."""
import math, random, sys
from mesh_lib import mesh

random.seed(11)

def lerp(a, b, t):
    return (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)

def limb(a, b, widths):
    """Polygon around axis a->b. widths: list of (t, front, back) half-widths; front is on
    the left-hand normal of the direction a->b."""
    dx, dy = b[0] - a[0], b[1] - a[1]; L = math.hypot(dx, dy); ux, uy = dx / L, dy / L
    nx, ny = uy, -ux  # normal (rotated -90deg)
    front = [(lerp(a, b, t)[0] + nx * f, lerp(a, b, t)[1] + ny * f) for t, f, _ in widths]
    back = [(lerp(a, b, t)[0] - nx * k, lerp(a, b, t)[1] - ny * k) for t, _, k in widths]
    return front + back[::-1]

def capsule(a, b, r, n=6):
    dx, dy = b[0] - a[0], b[1] - a[1]; ang = math.atan2(dy, dx)
    pts = []
    for i in range(n + 1):
        t = ang - math.pi / 2 + math.pi * i / n
        pts.append((b[0] + r * math.cos(t), b[1] + r * math.sin(t)))
    for i in range(n + 1):
        t = ang + math.pi / 2 + math.pi * i / n
        pts.append((a[0] + r * math.cos(t), a[1] + r * math.sin(t)))
    return pts

def ellipse(c, rx, ry, rot, n=14):
    ca, sa = math.cos(rot), math.sin(rot)
    return [(c[0] + rx * math.cos(2*math.pi*i/n) * ca - ry * math.sin(2*math.pi*i/n) * sa,
             c[1] + rx * math.cos(2*math.pi*i/n) * sa + ry * math.sin(2*math.pi*i/n) * ca) for i in range(n)]

HIP = (-20, 236); KNEE = (214, 100); ANKLE = (318, 268)
thigh = limb(HIP, KNEE, [(0, 40, 40), (0.4, 37, 38), (0.75, 33, 34), (1.0, 30, 30)])
shin = limb(KNEE, ANKLE, [(0.0, 26, 28), (0.12, 22, 33), (0.35, 19, 34), (0.6, 16, 25), (0.85, 13, 16), (1.0, 12, 14)])
knee_cap = ellipse((222, 86), 26, 22, -0.5)
foot = [(310, 258), (330, 262), (356, 268), (382, 277), (396, 287), (392, 294), (350, 294), (312, 294), (300, 286)]
TABLE = [(-10, 296), (410, 296), (410, 304), (-10, 304)]

# One smooth shape per hand and forearm, at the leg's mesh density.
hand1 = [(150, -24), (182, -24), (214, 30), (233, 35), (251, 51), (263, 73), (262, 92), (252, 99),
         (245, 86), (236, 73), (222, 65), (206, 65), (194, 58), (189, 44)]
hand2 = [(404, 154), (288, 172), (290, 163), (281, 156), (264, 160), (248, 169), (241, 186),
         (248, 201), (265, 207), (404, 182)]

SHAPES = [
    (TABLE, 46, 999, 0.5),
    (thigh, 16, 22, 0.55), (shin, 14, 18, 0.55), (knee_cap, 10, 14, 0.55), (foot, 12, 14, 0.55),
    (hand1, 13, 16, 0.55), (hand2, 13, 16, 0.55),
]

INK = "#1c3730"; SUN = "#d9a63a"; JOINT = (222, 98)
out = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">',
       f'<circle cx="{JOINT[0]}" cy="{JOINT[1]}" r="34" fill="{SUN}" opacity=".2"/>']
for poly, es, fs, w in SHAPES:
    P, edges, used = mesh(poly, es, fs)
    d = ''.join(f'M{P[a][0]:.1f} {P[a][1]:.1f}L{P[b][0]:.1f} {P[b][1]:.1f}' for a, b in edges)
    out.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{w}" stroke-opacity=".5" stroke-linecap="round"/>')
    for k in used:
        x, y = P[k]
        hot = math.hypot(x - JOINT[0], y - JOINT[1]) < 30 and poly in (thigh, shin, knee_cap)
        out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{1.5 if hot else 0.9}" fill="{SUN if hot else INK}"/>')
out.append('</svg>')
open(sys.argv[1], 'w', encoding='utf-8').write('\n'.join(out))
print('ok')
