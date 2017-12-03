"use strict"

class GridMap {
    /**
     *
     * @param {number} w
     * @param {number} l
     */
    constructor(w, l) {
        this.w = w
        this.l = l
        /** @type {?PositionedNode[]} */
        this.nodes = Array(l * l)
    }
    get cw() {
        return this.w / this.l
    }
    /**
     *
     * @param {PositionedNode} n
     * @param {boolean} overwrite
     * @returns {boolean}
     */
    addNode(n, overwrite = false) {
        let existing_node = this.nodes[n.x + n.y * this.l]
        if(overwrite || !existing_node) {
            this.nodes[n.x + n.y * this.l] = n
            return true
        } else {
            return false
        }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    display(ctx) {
        ctx.scale(this.cw, this.cw)
        for(let x = 0; x <= 10; x++) {
            ctx.moveTo(x, 0)
            ctx.lineTo(x, this.l)
        }
        for(let y = 0; y <= 10; y++) {
            ctx.moveTo(0, y)
            ctx.lineTo(this.l, y)
        }
        ctx.lineWidth = 2 / this.cw
        ctx.stroke()
    }
    /**
     *
     * @param {GridMap} grid_map
     * @param {CanvasRenderingContext2D} ctx
     * @param {PositionedNode} node
     * @param {function(): void} action
     */
    displayNode(grid_map, ctx, node, action) {
        ctx.save()
        ctx.translate(node.x, node.y)
        action()
        ctx.restore()
    }
    /**
     *
     * @param {number} x
     * @param {number} y
     * @returns {?PositionedNode}
     */
    nodeAt(x, y) {
        return this.nodes[x + y * this.l]
    }
    /**
     *
     * @param {number} x
     * @param {number} y
     * @returns {?boolean}
     */
    validAddress(x, y) {
        return x >= 0 && y >= 0 && x < this.l && y < this.l
    }
}

class PositionedNode {
    /**
     *
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    get nextSteps() {
        let steps = {
            cheap: [],
            expensive: [],
        };
        [-1, 1].forEach(o => {
            steps.cheap.push({x: o + this.x, y: this.y})
            steps.cheap.push({x: this.x, y: o + this.y})
        });
        [-1, 1].forEach(x => {
            [-1, 1].forEach(y => {
                steps.expensive.push({x: x + this.x, y: y + this.y})
            })
        })
        return steps
    }
    get position() {
        return {x: this.x, y: this.y}
    }
    /**
     *
     * @param {GridMap} grid_map
     * @param {CanvasRenderingContext2D} ctx
     * @param {string} colour
     */
    display(grid_map, ctx, colour) {
        grid_map.displayNode(grid_map, ctx, this, () => {
            ctx.fillStyle = colour
            ctx.fillRect(0.1, 0.1, 0.8, 0.8)
        })
    }
    /**
     *
     * @param {GridMap} grid_map
     * @returns {boolean}
     */
    inMap(grid_map) {
        return grid_map.nodeAt(this.x, this.y) === this
    }
}

class StartNode extends PositionedNode {
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {string} hint_colour
     */
    constructor(x, y, hint_colour) {
        super(x, y)
        this.colour = hint_colour
        /** @type {{[x: number]: (PathNode|StartNode)[]}} */
        this.newRoutes = {
            0: [this],
            2: [],
            4: [],
            6: [],
        }
        /** @type {{[x: number]: (PathNode|StartNode)[]}} */
        this.routes = {
            0: [this],
            2: [],
            4: [],
            6: [],
        }
    }
    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {PositionedNode} target
     * @param {boolean} cheap
     * @param {GridMap} grid_map
     * @returns {?Route}
     */
    stepOut(ctx, target, cheap, grid_map) {
        if(!this.routes) {
            this.routes = {
                0: [this],
                2: [],
                4: [],
                6: [],
            }
        }
        let route

        let step_type = cheap ? "cheap" : "expensive"
        let route_found = this.routes[0].some(path => {
            return path.nextSteps[step_type].some(step => {
                if(grid_map.validAddress(step.x, step.y)) {
                    let existing_node = grid_map.nodeAt(step.x, step.y)
                    if(!existing_node) {
                        let p = new PathNode(step.x, step.y, path)
                        let cost = Math.abs(step.x - path.x) + Math.abs(step.y - path.y) > 1 ? 6 : 4
                        this.newRoutes[cost].push(p)
                    } else if(
                        existing_node === target || (
                            existing_node instanceof PathNode && (
                                (this instanceof PathNode && existing_node.getOwner(grid_map) !== this.getOwner(grid_map)) ||
                                (!(this instanceof PathNode) && existing_node.getOwner(grid_map) !== this)
                            )
                        )
                    ) {
                        route = new Route(path, existing_node)
                        return true
                    }
                }
                return false
            })
        })
        if(route_found) {
            console.log("Route found")
            return route
        } else if(
            Object.keys(this.newRoutes).some(r => this.newRoutes[r].length > 0) ||
            Object.keys(this.routes).some(r => this.routes[r].length > 0)
        ) {
            return null
        } else {
            return new Route()
        }
    }
    /**
     *
     * @param {GridMap} grid_map
     * @param {CanvasRenderingContext2D} ctx
     */
    stepRoutes(grid_map, ctx) {
        this.routes[0] = this.routes[0].filter(p => p.inMap(grid_map))
        this.routes[0].forEach(path => {
            if(path !== this) path.display(grid_map, ctx, "black")
        })
        Object.keys(this.newRoutes).forEach(cost => {
            this.newRoutes[cost].forEach(p => {
                if(grid_map.addNode(p)) {
                    p.display(grid_map, ctx, "light" + this.colour)
                }
            })
        })
        this.routes = {
            0: this.routes[2],
            2: this.routes[4].concat(this.newRoutes[4]),
            4: this.routes[6].concat(this.newRoutes[6]),
            6: [],
        }
        this.newRoutes = {
            4: [],
            6: [],
        }
    }
}

class PathNode extends PositionedNode {
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {PositionedNode} from_node
     */
    constructor(x, y, from_node) {
        super(x, y)
        let dx = this.x - from_node.x
        let dy = this.y - from_node.y
        if(Math.abs(dx) - Math.abs(dy) == 0) {
            // diagonal
            this.fromDirection = 4 + Math.abs(dx) + dx + (Math.abs(dy) + dy)/2
        } else {
            // straight
            this.fromDirection = Math.abs(dx) + dx + dy + 1
        }
    }
    /**
     * The position this node came from.
     *
     * 7 2 5
     * 3   1
     * 6 0 4
     */
    get fromPosition() {
        if(this.fromDirection >= 4) {
            let t = this.fromDirection - 4
            let dx = (t & 2) - 1
            let dy = (t % 2) * 2 - 1
            return {x: this.x - dx, y: this.y - dy}
        } else {
            let t = this.fromDirection - 1
            if(t % 2) {
                // -1, 1
                return {x: this.x, y: this.y - t}
            } else {
                // 0, 2
                return {x: this.x - t + 1, y: this.y}
            }
        }
    }
    /**
     *
     * @param {GridMap} grid_map
     * @param {CanvasRenderingContext2D} ctx
     * @param {string} colour
     */
    display(grid_map, ctx, colour) {
        super.display(grid_map, ctx, colour)
        grid_map.displayNode(grid_map, ctx, this, () => {
            ctx.scale(0.1, 0.1)
            ctx.font = "8px Arial"
            ctx.fillStyle = "#888"
            ctx.fillText("" + this.fromDirection, 1, 9)
        })
    }
    /**
     *
     * @param {GridMap} grid_map
     * @returns {StartNode}
     */
    getOwner(grid_map) {
        let p
        for(p = this; !(p instanceof StartNode); p = p.getPreviousNode(grid_map)) ;
        return p
    }
    /**
     *
     * @param {GridMap} grid_map
     * @returns {StartNode | PathNode}
     */
    getPreviousNode(grid_map) {
        let position = this.fromPosition
        let n = grid_map.nodeAt(position.x, position.y)
        if(n instanceof PathNode || n instanceof StartNode) {
            return n
        } else {
            throw new Error("Bad previous node")
        }
    }
}

class Route {
    /**
     *
     * @param {PositionedNode} left
     * @param {PositionedNode} right
     */
    constructor(left = null, right = null) {
        this.left = left
        this.right = right
    }
    /**
     *
     * @param {GridMap} grid_map
     * @param {CanvasRenderingContext2D} ctx
     */
    display(grid_map, ctx) {
        this.getNodes(grid_map).forEach(n => {
            if(n === this.left) {
                n.display(grid_map, ctx, "pink")
            } else if(n === this.right) {
                n.display(grid_map, ctx, "yellow")
            } else {
                n.display(grid_map, ctx, "orange")
            }
        })
    }
    /**
     *
     * @param {GridMap} grid_map
     * @returns {number}
     */
    getCost(grid_map) {
        if(!this.left) return Infinity
        let [a, b] = [this.left, this.right]
        let cost = 0
        if(a.x == b.x || a.y == b.y) {
            cost += 4
        } else {
            cost += 6
        }
        this.getNodes(grid_map).forEach(n => {
            if(n.fromPosition.x == n.x || n.fromPosition.y == n.y) {
                cost += 4
            } else {
                cost += 6
            }
        })
        return cost
    }
    /**
     *
     * @param {GridMap} grid_map
     * @return {PathNode[]}
     */
    getNodes(grid_map) {
        let [a, b] = [this.left, this.right]
        let nodes = []
        while(a instanceof PathNode) {
            nodes.push(a)
            a = grid_map.nodeAt(a.fromPosition.x, a.fromPosition.y)
        }
        while(b instanceof PathNode) {
            nodes.unshift(b)
            b = grid_map.nodeAt(b.fromPosition.x, b.fromPosition.y)
        }
        return nodes
    }
}

/**
 * @typedef testSignature
 * @property {{x: number, y: number}} start
 * @property {{x: number, y: number}} finish
 * @property {{x: number, y: number}[]} obstructions
 * @property {?boolean} passed
 * @property {?number} correctLength
 */

class GridTest {
    constructor() {
        this.tests = []
        this.nextTestNumber = 0
        this.paused = false
        this.currentTest = null
        this.rejectPromise = null
        this.resolvePromise = null
    }
    /** @type {testSignature} */
    get generatedState() {
        return {
            start: this.start.position,
            finish: this.finish.position,
            obstructions: this.obstructions.map(o => o.position),
            passed: null,
            correctLength: null,
        }
    }
    get testNumber() {
        return this._testNumber
    }
    /** @param {?number} v */
    set testNumber(v) {
        this._testNumber = v
        let input = document.querySelector("input#test-number")
        if(input instanceof HTMLInputElement) {
            input.value = (v === null) ? "" : ("" + v)
        }
    }
    dumpGeneratedState() {
        console.log(JSON.stringify(this.generatedState))
    }
    init() {
        let c = document.getElementById("grid")
        if(c instanceof HTMLCanvasElement) {
            var ctx = c.getContext("2d")
            this.ctx = ctx
        } else {
            console.log("Well, that's the wrong element type")
        }
    }
    initForRandom() {
        this.currentTest = null
        /** @type {PositionedNode[]} */
        this.obstructions = []
        for(let i = 0; i < 31; i++) {
            this.obstructions.push(new PositionedNode(
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10)
            ))
        }

        this.start = new StartNode(
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10),
            "green"
        )
        do {
            this.finish = new StartNode(
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
                "blue"
            )
        } while(
            this.finish.position.x == this.start.position.x &&
            this.finish.position.y == this.start.position.y
        )

        this.ctx.restore()
        this.ctx.fillStyle = "white"
        this.ctx.fillRect(0, 0, 250, 250)
        this.ctx.save()

        let grid_map = new GridMap(250, 10)
        grid_map.display(this.ctx)

        this.obstructions.forEach(o => grid_map.addNode(o, true))
        grid_map.addNode(this.start, true)
        grid_map.addNode(this.finish, true)

        this.obstructions = this.obstructions.filter(
            o => o.inMap(grid_map)
        )

        this.gridMap = grid_map
        this.obstructions.forEach(o => o.display(grid_map, this.ctx, "red"))
        this.start.display(grid_map, this.ctx, "green")
        this.finish.display(grid_map, this.ctx, "blue")

        this.testNumber = null
    }
    /**
     *
     * @param {testSignature} test
     */
    initForTest(test) {
        this.currentTest = test
        this.start = new StartNode(
            test.start.x,
            test.start.y,
            "green"
        )
        this.finish = new StartNode(
            test.finish.x,
            test.finish.y,
            "blue"
        )
        this.obstructions = test.obstructions.map(pos => new PositionedNode(
            pos.x,
            pos.y
        ))
        let grid_map = new GridMap(250, 10)
        this.ctx.restore()
        this.ctx.fillStyle = "white"
        this.ctx.fillRect(0, 0, 250, 250)
        this.ctx.save()
        grid_map.display(this.ctx)

        this.obstructions.forEach(o => grid_map.addNode(o, true))
        grid_map.addNode(this.start, true)
        grid_map.addNode(this.finish, true)

        this.obstructions = this.obstructions.filter(
            o => o.inMap(grid_map)
        )

        this.gridMap = grid_map
        this.obstructions.forEach(o => o.display(grid_map, this.ctx, "red"))
        this.start.display(grid_map, this.ctx, "green")
        this.finish.display(grid_map, this.ctx, "blue")
    }
    nextTest() {
        this.initForTest(this.tests[this.nextTestNumber])
        this.testNumber = this.nextTestNumber
        if(!this.paused) {
            this.run()
        }
        this.nextTestNumber = (this.nextTestNumber + 1) % this.tests.length
    }
    randomTest() {
        this.initForRandom()
        this.testNumber = null
        if(!this.paused) {
            this.run()
        }
    }
    run(interval_ms = 100) {
        if(this.runInterval) {
            clearInterval(this.runInterval)
        }
        if(this.rejectPromise) {
            this.rejectPromise()
        }
        return new Promise((resolve, reject) => {
            this.resolvePromise = resolve
            this.rejectPromise = reject
            this.runInterval = setInterval(() => this.step(), interval_ms)
        })
    }
    runAll() {
        return this.tests.reduce(
            (carry, test, i) => carry.then(() => {
                this.initForTest(test)
                this.testNumber = i
                return this.run(10)
            }),
            new Promise(resolve => resolve())
        )
    }
    selectTest(n) {
        this.initForTest(this.tests[n])
        this.testNumber = n
        if(!this.paused) {
            this.run()
        }
    }
    step() {
        let possible_routes = [
            this.start.stepOut(this.ctx, this.finish, true, this.gridMap),
            this.finish.stepOut(this.ctx, this.start, true, this.gridMap),
            this.start.stepOut(this.ctx, this.finish, false, this.gridMap),
            this.finish.stepOut(this.ctx, this.start, false, this.gridMap),
        ].filter(route => route)

        if(possible_routes.length) {
            let route = possible_routes.sort((a, b) => a.getCost(this.gridMap) - b.getCost(this.gridMap))[0]
            if(route.left) {
                route.display(this.gridMap, this.ctx)
            } else {
                console.log("No route found")
            }
            if(this.runInterval) {
                clearTimeout(this.runInterval)
                this.runInterval = null
            }
            console.log("done")
            this.dumpGeneratedState()
            let tr = document.createElement("tr")
            let td = document.createElement("td")
            td.textContent = this.testNumber === null ?
                "Random test" :
                `Test ${this.testNumber}`
            tr.appendChild(td)
            td = document.createElement("td")
            td.textContent = route.getCost(this.gridMap) === Infinity ? "miss" : "" + route.getCost(this.gridMap)
            tr.appendChild(td)
            td = document.createElement("td")
            td.textContent = this.testNumber === null ?
                "N/A" :
                "" + this.currentTest.correctLength
            tr.appendChild(td)

            if(this.currentTest && this.currentTest.correctLength < route.getCost(this.gridMap)) {
                tr.style.color = "red"
            }
            document.querySelector("#test-results").appendChild(
                tr
            )
            if(this.resolvePromise) {
                this.resolvePromise()
            }
        } else {
            this.start.stepRoutes(this.gridMap, this.ctx)
            this.finish.stepRoutes(this.gridMap, this.ctx)
        }
    }
}