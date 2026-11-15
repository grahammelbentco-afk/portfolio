import math, random

def inside(pt, poly):
    x, y = pt; n = len(poly); c = False
    for i in range(n):
        x1, y1 = poly[i]; x2, y2 = poly[(i + 1) % n]
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1 + 1e-9) + x1:
            c = not c
    return c

def densify(poly, step):
    out = []
    for i in range(len(poly)):
        (x1, y1), (x2, y2) = poly[i], poly[(i + 1) % len(poly)]
        d = math.hypot(x2 - x1, y2 - y1); k = max(1, int(d // step))
        for j in range(k):
            t = j / k
            out.append((x1 + (x2 - x1) * t, y1 + (y2 - y1) * t))
    return out

def fill(poly, step):
    xs = [p[0] for p in poly]; ys = [p[1] for p in poly]
    pts = []
    y = min(ys) + step / 2
    while y < max(ys):
        x = min(xs) + step / 2
        while x < max(xs):
            q = (x + random.uniform(-step * .35, step * .35), y + random.uniform(-step * .35, step * .35))
            if inside(q, poly):
                pts.append(q)
            x += step
        y += step * 0.87
    return pts

def circum(a, b, c):
    ax, ay = a; bx, by = b; cx, cy = c
    d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
    if abs(d) < 1e-12:
        return (0, 0, float('inf'))
    ux = ((ax*ax+ay*ay)*(by-cy)+(bx*bx+by*by)*(cy-ay)+(cx*cx+cy*cy)*(ay-by))/d
    uy = ((ax*ax+ay*ay)*(cx-bx)+(bx*bx+by*by)*(ax-cx)+(cx*cx+cy*cy)*(bx-ax))/d
    return (ux, uy, (ax-ux)**2 + (ay-uy)**2)

def delaunay(pts):
    P = list(pts) + [(-1e4, -1e4), (1e4, -1e4), (0, 1e4)]
    n = len(pts); tris = [(n, n + 1, n + 2)]
    for i in range(n):
        p = P[i]; bad = []
        for t in tris:
            ux, uy, r2 = circum(P[t[0]], P[t[1]], P[t[2]])
            if (p[0]-ux)**2 + (p[1]-uy)**2 < r2:
                bad.append(t)
        edges = {}
        for t in bad:
            for e in ((t[0],t[1]),(t[1],t[2]),(t[2],t[0])):
                k = tuple(sorted(e)); edges[k] = edges.get(k, 0) + 1
        tris = [t for t in tris if t not in bad]
        for (a, b), cnt in edges.items():
            if cnt == 1:
                tris.append((a, b, i))
    return P, [t for t in tris if max(t) < n]

def mesh(poly, edge_step, fill_step):
    pts = densify(poly, edge_step) + fill(poly, fill_step)
    P, tris = delaunay(pts)
    keep = []
    for t in tris:
        cx = sum(P[k][0] for k in t) / 3; cy = sum(P[k][1] for k in t) / 3
        if inside((cx, cy), poly):
            keep.append(t)
    edges = set()
    for t in keep:
        for e in ((t[0],t[1]),(t[1],t[2]),(t[2],t[0])):
            edges.add(tuple(sorted(e)))
    used = sorted({k for e in edges for k in e})
    return P, edges, used

