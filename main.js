const init = () => {
    const i = 5,
        t = 0.3,
        e = 0.8;
    let s,
        h,
        r,
        c,
        o,
        l,
        n,
        d,
        a,
        u,
        v,
        y,
        k,
        m = [],
        p = { x: 0, y: 0 };
    const x = Math.random,
        f = Math.floor,
        b = Math.min,
        g = Math.max,
        C = 2 * Math.PI,
        w = Math.sqrt,
        T = w(3),
        P = T / 2;
    function E(i, t) {
        return void 0 === t && ((t = i), (i = 0)), f(i + (t - i) * x());
    }
    let F, M;
    {
        let i, t, e;
        ((F = function (i, t) {
            (this.kx = i), (this.ky = t), (this.neighbours = []);
        }).dimensions = function () {
            (t = (o - u * (1.5 * n + 0.5)) / 2 + u),
                (e = (l - u * T * (d + 0.5)) / 2 + u * T),
                ((i = [[], [], [], [], [], []])[3][0] = -(u + 0.5)),
                (i[2][0] = i[4][0] = -(u + 0.5) / 2),
                (i[1][0] = i[5][0] = +(u + 0.5) / 2),
                (i[0][0] = u + 0.5),
                (i[4][1] = i[5][1] = -(u + 0.5) * P),
                (i[0][1] = i[3][1] = 0),
                (i[1][1] = i[2][1] = (u + 0.5) * P),
                (F.dirx = [P, 0, -P, -P, 0, P]),
                (F.diry = [0.5, 1, 0.5, -0.5, -1, -0.5]);
        }),
            (F.prototype.size = function () {
                (this.xc = t + 1.5 * this.kx * u),
                    (this.yc = e + this.ky * u * T),
                    1 & this.kx && (this.yc -= u * P),
                    (this.vertices = [[], [], [], [], [], []]),
                    (this.middles = [[], [], [], [], [], []]),
                    (this.vertices[3][0] = this.xc + i[3][0]),
                    (this.vertices[2][0] = this.vertices[4][0] =
                        this.xc + i[2][0]),
                    (this.vertices[1][0] = this.vertices[5][0] =
                        this.xc + i[1][0]),
                    (this.vertices[0][0] = this.xc + i[0][0]),
                    (this.vertices[4][1] = this.vertices[5][1] =
                        this.yc + i[4][1]),
                    (this.vertices[0][1] = this.vertices[3][1] =
                        this.yc + i[0][1]),
                    (this.vertices[1][1] = this.vertices[2][1] =
                        this.yc + i[1][1]);
                for (let i = 0; i < 6; ++i)
                    this.middles[i] = [
                        (this.vertices[i][0] + this.vertices[(i + 1) % 6][0]) /
                            2,
                        (this.vertices[i][1] + this.vertices[(i + 1) % 6][1]) /
                            2,
                    ];
            }),
            (F.prototype.drawHexagon = function () {
                this.vertices || this.size(),
                    (r.globalCompositeOperation = "source-over"),
                    r.beginPath(),
                    r.moveTo(this.vertices[0][0], this.vertices[0][1]),
                    r.lineTo(this.vertices[1][0], this.vertices[1][1]),
                    r.lineTo(this.vertices[2][0], this.vertices[2][1]),
                    r.lineTo(this.vertices[3][0], this.vertices[3][1]),
                    r.lineTo(this.vertices[4][0], this.vertices[4][1]),
                    r.lineTo(this.vertices[5][0], this.vertices[5][1]),
                    r.lineTo(this.vertices[0][0], this.vertices[0][1]),
                    (r.strokeStyle = "#444c56"),
                    (r.lineWidth = 2),
                    r.stroke(),
                    (r.globalCompositeOperation = "destination-out");
                for (let i = 0; i < 6; ++i)
                    this.neighbour(i) &&
                        (r.beginPath(),
                        r.arc(this.middles[i][0], this.middles[i][1], 3, 0, C),
                        r.fill());
            }),
            (F.prototype.drawSide = function (i, t) {
                let e = (i + 1) % 6;
                this.vertices || this.size();
                let s = h;
                s.beginPath(),
                    s.moveTo(this.vertices[i][0], this.vertices[i][1]),
                    s.lineTo(this.vertices[e][0], this.vertices[e][1]),
                    (s.strokeStyle = `hsl(${t},100%,60%)`),
                    (s.lineWidth = 1),
                    s.stroke();
            }),
            (F.prototype.neighbour = function (i) {
                let t = this.neighbours[i];
                return t instanceof F
                    ? t
                    : !1 !== t &&
                          ((t =
                              1 & this.kx
                                  ? {
                                        kx: this.kx + [1, 0, -1, -1, 0, 1][i],
                                        ky: this.ky + [0, 1, 0, -1, -1, -1][i],
                                    }
                                  : {
                                        kx: this.kx + [1, 0, -1, -1, 0, 1][i],
                                        ky: this.ky + [1, 1, 1, 0, -1, 0][i],
                                    }).kx < 0 ||
                          t.ky < 0 ||
                          t.kx >= n ||
                          t.ky >= d
                              ? ((this.neighbours[i] = !1), !1)
                              : ((t = a[t.ky][t.kx]),
                                (this.neighbours[i] = t),
                                (t.neighbours[(i + 3) % 6] = this),
                                t));
            });
    }
    function A() {
        var i, s;
        this.radius =
            v * ((i = t), void 0 === (s = e) ? i * x() : i + (s - i) * x());
        do {
            (this.kx = E(n)),
                (this.ky = E(d)),
                (this.cell = a[this.ky][this.kx]),
                (this.comesFrom = E(6));
        } while (
            !1 === this.cell.neighbour(this.comesFrom) ||
            this.cell.occupied
        );
        (this.state = 0),
            (this.retries = 0),
            (this.cell.occupied = !0),
            (this.hue = E(360)),
            (this.hueNoise = (function (i, t = 0, e = 1, s) {
                let h = (s = s || Math.random)(),
                    r = t + (e - t) * s(),
                    c = t + (e - t) * s(),
                    o = 1 / i;
                return function () {
                    (h += o) > 1 &&
                        ((h -= 1), (r = c), (c = t + (e - t) * s()));
                    let i = (3 - 2 * h) * h * h;
                    return i * c + (1 - i) * r;
                };
            })(1e3, -1, 1));
    }
    function S() {
        let t, e;
        (o = window.innerWidth), (l = window.innerHeight);
        let m = g((window.innerWidth - o) / 2, 0),
            p = g((window.innerHeight - l) / 2, 0);
        if (
            ((c.style.left = s.style.left = m + "px"),
            (c.style.top = s.style.top = p + "px"),
            (c.width = s.width = o),
            (c.height = s.height = l),
            (r.lineCap = h.lineCap = "round"),
            (t = f((o - 6) / (i + f((i + 1) / 2)))),
            (e = f((l - 6) / P / (2 * i + 1))),
            (u = b(t, e)),
            (v = u * P),
            (n = f((o / u - 0.5) / 1.5)),
            (d = f(l / u / T - 0.5)),
            n <= 2 || d <= 2)
        )
            return !1;
        if ((y = f((n * d) / 3)) < 1) return !1;
        F.dimensions(),
            (function () {
                let i;
                a = [];
                for (let t = 0; t < d; ++t) {
                    a[t] = [];
                    for (let e = 0; e < n; ++e)
                        (i = new F(e, t)), (a[t][e] = i);
                }
            })(),
            r.clearRect(0, 0, o, l),
            a.forEach((i) => {
                i.forEach((i) => {
                    i.drawHexagon();
                });
            }),
            (k = []);
        for (let i = 0; i < y; ++i) k[i] = new A();
        return !0;
    }
    A.prototype.move = function () {
        let i, t, e, s, r, c, o;
        switch (
            ((this.hue += this.hueNoise()),
            (this.hue = (this.hue + 360) % 360),
            (h.fillStyle = `hsl(${this.hue},100%,50%)`),
            this.state)
        ) {
            case 0:
                h.beginPath(),
                    h.arc(this.cell.xc, this.cell.yc, this.radius, 0, C),
                    h.fill(),
                    (e = 0);
                do {
                    (i =
                        (this.comesFrom +
                            3 +
                            [-2, -1, -1, 0, 0, 0, 1, 1, 2][E(9)]) %
                        6),
                        (t = this.cell.neighbour(i)).occupied && (t = !1),
                        ++e;
                } while (!1 === t && e < 30);
                if (
                    !1 === t &&
                    ((i = this.comesFrom),
                    (t = this.cell.neighbour(i)).occupied)
                )
                    break;
                this.state++, (this.dC = 0), (this.dir = i), (t.occupied = !0);
                break;
            case 1:
                (this.dC += 0.03 * u),
                    this.dC + this.radius >= v &&
                        ((this.dC = v - this.radius),
                        (this.state = 2),
                        (this.alphaCross = 0)),
                    (s = this.cell.xc + F.dirx[this.dir] * this.dC),
                    (r = this.cell.yc + F.diry[this.dir] * this.dC),
                    h.beginPath(),
                    h.arc(s, r, this.radius, 0, C),
                    h.fill();
                break;
            case 2:
                (this.alphaCross += 0.015),
                    this.alphaCross >= 1 &&
                        ((this.state = 3),
                        (this.alphaCross = 1),
                        (this.dC = v + this.radius)),
                    (c =
                        this.radius * w(1 - this.alphaCross * this.alphaCross)),
                    (o = this.radius * this.alphaCross),
                    h.beginPath(),
                    c > 0.5 &&
                        ((s =
                            this.cell.middles[this.dir][0] -
                            c * F.dirx[this.dir]),
                        (r =
                            this.cell.middles[this.dir][1] -
                            c * F.diry[this.dir]),
                        h.arc(s, r, c, 0, C)),
                    o > 0.5 &&
                        ((s =
                            this.cell.middles[this.dir][0] +
                            o * F.dirx[this.dir]),
                        (r =
                            this.cell.middles[this.dir][1] +
                            o * F.diry[this.dir]),
                        h.arc(s, r, o, 0, C)),
                    h.fill();
                break;
            case 3:
                (this.dC += 0.03 * u),
                    this.dC >= 2 * v && (this.dC = 2 * v),
                    (s = this.cell.xc + F.dirx[this.dir] * this.dC),
                    (r = this.cell.yc + F.diry[this.dir] * this.dC),
                    h.beginPath(),
                    h.arc(s, r, this.radius, 0, C),
                    h.fill(),
                    this.dC >= 2 * v &&
                        ((this.cell.occupied = !1),
                        (this.cell = this.cell.neighbour(this.dir)),
                        (this.kx = this.cell.kx),
                        (this.ky = this.cell.ky),
                        (this.comesFrom = (this.dir + 3) % 6),
                        (this.state = 0));
        }
    };
    {
        let i = 0;
        M = function () {
            const t = m.shift();
            switch ((window.requestAnimationFrame(M), i)) {
                case 0:
                    S() && (++i, (p.x = o / 2), (p.y = l / 2));
                    break;
                case 1:
                    if (
                        (h.clearRect(0, 0, o, l),
                        k.forEach((i) => {
                            i.move();
                        }),
                        !t || "click" !== t.event)
                    )
                        break;
                    i = 0;
            }
        };
    }
    ((s = document.createElement("canvas")).style.position = "absolute"),
        document.body.appendChild(s),
        (h = s.getContext("2d")),
        s.setAttribute("title", "click me"),
        ((c = document.createElement("canvas")).style.position = "absolute"),
        document.body.appendChild(c),
        (r = c.getContext("2d")),
        (c.style.zIndex = 1),
        window.addEventListener("click", function (i) {
            "CANVAS" == i.target.tagName &&
                (m.push({ event: "click" }),
                (p.x = i.clientX),
                (p.y = i.clientY));
        }),
        window.requestAnimationFrame(M);
};

window.addEventListener("load", init);
