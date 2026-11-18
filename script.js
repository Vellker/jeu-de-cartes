// ============================================================================
// 1. BASE DE DONNÉES DES 20 MONSTRES + 3 SORTILÈGES (MODIFIABLE FACILEMENT)
// ============================================================================
const DECK_SIZE = 30;
const MAX_COPIES_PER_CARD = 3;

const CARDS_DATABASE = new Array(
    // --- 20 MONSTRES (type: "creature") ---
    { id: 1,  type: "creature", name: "Larve de Poussière",   cost: 1, atk: 1, hp: 1, image: "image/creature1.png",  fallbackIcon: "🐛" },
    { id: 2,  type: "creature", name: "Diablotin Étincelle",  cost: 1, atk: 2, hp: 1, image: "image/creature2.png",  fallbackIcon: "🔥" },
    { id: 3,  type: "creature", name: "Tortue Caillou",       cost: 1, atk: 1, hp: 2, image: "image/creature3.png",  fallbackIcon: "🐢" },
    { id: 4,  type: "creature", name: "Feu Follet Égaré",     cost: 1, atk: 2, hp: 1, image: "image/creature4.png",  fallbackIcon: "👻" },

    { id: 5,  type: "creature", name: "Loup des Ombres",      cost: 2, atk: 2, hp: 2, image: "image/creature5.png",  fallbackIcon: "🐺" },
    { id: 6,  type: "creature", name: "Gobelin Chapardeur",   cost: 2, atk: 3, hp: 1, image: "image/creature6.png",  fallbackIcon: "👺" },
    { id: 7,  type: "creature", name: "Golem de Boue",        cost: 2, atk: 1, hp: 4, image: "image/creature7.png",  fallbackIcon: "🗿" },
    { id: 8,  type: "creature", name: "Faucon des Cimes",     cost: 2, atk: 3, hp: 2, image: "image/creature8.png",  fallbackIcon: "🦅" },

    { id: 9,  type: "creature", name: "Chevalier Squelette",  cost: 3, atk: 3, hp: 3, image: "image/creature9.png",  fallbackIcon: "💀" },
    { id: 10, type: "creature", name: "Basilic Venimeux",     cost: 3, atk: 4, hp: 2, image: "image/creature10.png", fallbackIcon: "🐍" },
    { id: 11, type: "creature", name: "Gardien de Pierre",    cost: 3, atk: 2, hp: 5, image: "image/creature11.png", fallbackIcon: "🛡️" },
    { id: 12, type: "creature", name: "Spectre Hurleur",      cost: 3, atk: 4, hp: 3, image: "image/creature12.png", fallbackIcon: "🧟" },

    { id: 13, type: "creature", name: "Minotaure Enragé",     cost: 4, atk: 4, hp: 4, image: "image/creature13.png", fallbackIcon: "🐂" },
    { id: 14, type: "creature", name: "Griffon Royal",        cost: 4, atk: 5, hp: 3, image: "image/creature14.png", fallbackIcon: "🦁" },
    { id: 15, type: "creature", name: "Colosse d'Acier",      cost: 4, atk: 3, hp: 5, image: "image/creature15.png", fallbackIcon: "🤖" },
    { id: 16, type: "creature", name: "Hydre des Marais",     cost: 4, atk: 4, hp: 5, image: "image/creature16.png", fallbackIcon: "🐉" },

    { id: 17, type: "creature", name: "Dragonnet de Braise",  cost: 5, atk: 5, hp: 4, image: "image/creature17.png", fallbackIcon: "🐲" },
    { id: 18, type: "creature", name: "Béhémoth Ancien",      cost: 5, atk: 4, hp: 5, image: "image/creature18.png", fallbackIcon: "🦏" },
    { id: 19, type: "creature", name: "Archidémon du Gouffre",cost: 5, atk: 5, hp: 5, image: "image/creature19.png", fallbackIcon: "😈" },
    { id: 20, type: "creature", name: "Léviathan Abyssal",    cost: 5, atk: 5, hp: 5, image: "image/creature20.png", fallbackIcon: "🐋" },

    // --- 3 SORTILÈGES (type: "spell") ---
    {
        id: 21,
        type: "spell",
        spellEffect: "sacrifice_mana",
        name: "Transmutation",
        cost: 1,
        desc: "Sacrifie 1 de vos monstres en jeu pour gagner +1 PM.",
        image: "image/spell1.png",
        fallbackIcon: "💎"
    },
    {
        id: 22,
        type: "spell",
        spellEffect: "damage_one",
        name: "Éclair Arcanique",
        cost: 5,
        desc: "Inflige 1 dégât à un monstre adverse ou au joueur.",
        image: "image/spell2.png",
        fallbackIcon: "⚡"
    },
    {
        id: 23,
        type: "spell",
        spellEffect: "draw_two",
        name: "Savoir Interdit",
        cost: 1,
        desc: "Piochez 2 cartes immédiatement.",
        image: "image/spell3.png",
        fallbackIcon: "📜"
    }
);

// ============================================================================
// 2. CONFIGURATION DE LA SALLE DE CLASSE (14 TABLES, 28 CHAISES)
// ============================================================================
const canvas = document.getElementById("classroom-canvas");
const ctx = canvas.getContext("2d");
const CANVAS_W = canvas.width;
const CANVAS_H = canvas.height;

const tables = new Array();
const chairs = new Array();

function initClassroom() {
    let tableId = 1;
    const layout = new Array(
        { cols: 4, y: 145 },
        { cols: 4, y: 255 },
        { cols: 3, y: 365 },
        { cols: 3, y: 475 }
    );

    layout.forEach((row) => {
        const spacing = 195;
        const tWidth = 72;
        const tHeight = 44;
        const totalWidth = (row.cols - 1) * spacing + tWidth;
        const startX = (CANVAS_W - totalWidth) / 2;

        for (let c = 0; c < row.cols; c++) {
            const tx = startX + c * spacing;
            const ty = row.y;

            tables.push({ id: tableId, x: tx, y: ty, w: tWidth, h: tHeight });

            chairs.push({
                id: `t${tableId}_left`,
                tableId: tableId,
                x: tx - 26,
                y: ty + 10,
                w: 22,
                h: 24,
                occupiedBy: tableId === 1 ? "bot" : null
            });

            chairs.push({
                id: `t${tableId}_right`,
                tableId: tableId,
                x: tx + tWidth + 4,
                y: ty + 10,
                w: 22,
                h: 24,
                occupiedBy: null
            });

            tableId++;
        }
    });
}

// ============================================================================
// 3. ÉTAT DU JOUEUR & DÉPLACEMENTS 2D
// ============================================================================
const player = {
    x: 450,
    y: 555,
    radius: 14,
    speed: 3.5,
    seatedChairId: null
};

const keys = {};

// Deck par défaut de 30 cartes (équilibré entre créatures et sortilèges)
let playerDeckIds = new Array(
    1, 1, 2, 2, 3, 3,
    5, 5, 6, 6, 7, 8,
    9, 9, 10, 11, 12,
    13, 14, 15, 16,
    17, 18, 19,
    21, 21, 22, 22, 23, 23
);

const botDefaultDeckIds = new Array(
    1, 1, 2, 2, 3, 4,
    5, 5, 6, 7, 8, 8,
    9, 9, 10, 10, 11, 12,
    13, 13, 14, 15, 16, 16,
    17, 17, 18, 19, 20, 20
);

let isDeckModalOpen = false;
let isDuelActive = false;

window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    keys[key] = true;

    if (key === "e" && !isDeckModalOpen && !isDuelActive) {
        handleSitToggle();
    }
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

function handleSitToggle() {
    const promptEl = document.getElementById("interaction-prompt");
    const deckBtn = document.getElementById("btn-deck-editor");

    if (player.seatedChairId) {
        const chair = chairs.find((c) => c.id === player.seatedChairId);
        if (chair) {
            chair.occupiedBy = null;
            player.y = chair.y + 42;
        }
        player.seatedChairId = null;
        deckBtn.disabled = false;
        promptEl.classList.add("hidden");
        return;
    }

    const targetChair = chairs.find((chair) => {
        if (chair.occupiedBy) return false;
        const cx = chair.x + chair.w / 2;
        const cy = chair.y + chair.h / 2;
        return Math.hypot(player.x - cx, player.y - cy) < 46;
    });

    if (targetChair) {
        targetChair.occupiedBy = "player";
        player.seatedChairId = targetChair.id;
        player.x = targetChair.x + targetChair.w / 2;
        player.y = targetChair.y + targetChair.h / 2;
        deckBtn.disabled = true;

        const partnerChair = chairs.find(
            (c) => c.tableId === targetChair.tableId && c.id !== targetChair.id
        );

        if (partnerChair && partnerChair.occupiedBy === "bot") {
            promptEl.classList.add("hidden");
            startDuel();
        } else {
            promptEl.textContent = "Table vide — Appuyez sur [E] pour vous lever";
            promptEl.classList.remove("hidden");
        }
    }
}

function checkCollision(nx, ny, r) {
    if (nx - r < 20 || nx + r > CANVAS_W - 20 || ny - r < 85 || ny + r > CANVAS_H - 20) {
        return true;
    }
    for (const t of tables) {
        const closestX = Math.max(t.x, Math.min(nx, t.x + t.w));
        const closestY = Math.max(t.y, Math.min(ny, t.y + t.h));
        if (Math.hypot(nx - closestX, ny - closestY) < r) {
            return true;
        }
    }
    return false;
}

function updateAndDrawClassroom() {
    if (!player.seatedChairId && !isDeckModalOpen && !isDuelActive) {
        let dx = 0;
        let dy = 0;
        if (keys["arrowup"] || keys["w"] || keys["z"]) dy -= 1;
        if (keys["arrowdown"] || keys["s"]) dy += 1;
        if (keys["arrowleft"] || keys["a"] || keys["q"]) dx -= 1;
        if (keys["arrowright"] || keys["d"]) dx += 1;

        if (dx !== 0 || dy !== 0) {
            const len = Math.hypot(dx, dy);
            dx = (dx / len) * player.speed;
            dy = (dy / len) * player.speed;

            if (!checkCollision(player.x + dx, player.y, player.radius)) player.x += dx;
            if (!checkCollision(player.x, player.y + dy, player.radius)) player.y += dy;
        }

        const nearFreeChair = chairs.some(
            (c) => !c.occupiedBy && Math.hypot(player.x - (c.x + c.w / 2), player.y - (c.y + c.h / 2)) < 46
        );
        const promptEl = document.getElementById("interaction-prompt");
        if (nearFreeChair) {
            promptEl.textContent = "Appuyez sur [E] pour vous asseoir";
            promptEl.classList.remove("hidden");
        } else {
            promptEl.classList.add("hidden");
        }
    }

    // Parquet & Murs
    ctx.fillStyle = "#e2c699";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    ctx.fillStyle = "#475569";
    ctx.fillRect(0, 0, CANVAS_W, 80);
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 20;
    ctx.strokeRect(10, 10, CANVAS_W - 20, CANVAS_H - 20);

    // Tableau noir
    ctx.fillStyle = "#14532d";
    ctx.fillRect(250, 15, 400, 50);
    ctx.strokeStyle = "#78350f";
    ctx.lineWidth = 4;
    ctx.strokeRect(250, 15, 400, 50);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("TOURNOI DE MONSTRES - CLASSE 2B", 450, 45);

    // Chaises
    chairs.forEach((c) => {
        ctx.fillStyle = c.occupiedBy ? "#94a3b8" : "#b45309";
        ctx.fillRect(c.x, c.y, c.w, c.h);
        ctx.strokeStyle = "#451a03";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(c.x, c.y, c.w, c.h);
    });

    // 14 Tables
    tables.forEach((t) => {
        ctx.fillStyle = "#d97706";
        ctx.fillRect(t.x, t.y, t.w, t.h);
        ctx.strokeStyle = "#78350f";
        ctx.lineWidth = 2;
        ctx.strokeRect(t.x, t.y, t.w, t.h);

        ctx.fillStyle = "#fef3c7";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`#${t.id}`, t.x + t.w / 2, t.y + t.h / 2 + 4);
    });

    // Avatar Bot (Table #1 chaise gauche)
    const botChair = chairs.at(0);
    if (botChair) {
        const bx = botChair.x + botChair.w / 2;
        const by = botChair.y + botChair.h / 2;
        ctx.beginPath();
        ctx.arc(bx, by, 14, 0, Math.PI * 2);
        ctx.fillStyle = "#ef4444";
        ctx.fill();
        ctx.strokeStyle = "#7f1d1d";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.font = "bold 10px sans-serif";
        ctx.fillText("BOT", bx, by - 18);
    }

    // Avatar Joueur
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#2563eb";
    ctx.fill();
    ctx.strokeStyle = "#1e3a8a";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#1e3a8a";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("VOUS", player.x, player.y - 18);

    requestAnimationFrame(updateAndDrawClassroom);
}

// ============================================================================
// 4. ÉDITEUR DE DECK (MAX 3 COPIES PAR CARTE, TOTAL 30 CARTES)
// ============================================================================
const deckModal = document.getElementById("deck-modal");
const deckGrid = document.getElementById("deck-grid");
const btnDeckEditor = document.getElementById("btn-deck-editor");
const btnCloseDeck = document.getElementById("btn-close-deck");

btnDeckEditor.addEventListener("click", () => {
    if (player.seatedChairId || isDuelActive) return;
    isDeckModalOpen = true;
    renderDeckEditor();
    deckModal.classList.remove("hidden");
});

btnCloseDeck.addEventListener("click", () => {
    if (playerDeckIds.length !== DECK_SIZE) return;
    isDeckModalOpen = false;
    deckModal.classList.add("hidden");
    btnDeckEditor.textContent = `🃏 Éditeur de Deck (${playerDeckIds.length}/${DECK_SIZE})`;
});

function createCardArtHTML(card) {
    return `
    <div class="card-art">
    <img src="${card.image}" alt="${card.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
    <span class="card-fallback-icon" style="display:none;">${card.fallbackIcon}</span>
    </div>
    `;
}

function renderDeckEditor() {
    deckGrid.innerHTML = "";
    document.getElementById("deck-count").textContent = playerDeckIds.length;
    btnCloseDeck.disabled = playerDeckIds.length !== DECK_SIZE;
    btnCloseDeck.textContent =
    playerDeckIds.length === DECK_SIZE
    ? "Valider et Fermer"
    : `Sélectionnez ${DECK_SIZE} cartes (${playerDeckIds.length}/${DECK_SIZE})`;

    CARDS_DATABASE.forEach((card) => {
        const countInDeck = playerDeckIds.filter((id) => id === card.id).length;
        const isSpell = card.type === "spell";

        const cardEl = document.createElement("div");
        cardEl.className = `card ${isSpell ? "spell-card" : ""} ${countInDeck > 0 ? "selected" : ""}`;

        const bottomStatsHTML = isSpell
        ? `<div class="card-desc">${card.desc}</div>`
        : `<div class="card-stats">
        <span class="stat-atk">⚔️ ${card.atk}</span>
        <span class="stat-hp">❤️ ${card.hp}</span>
        </div>`;

        cardEl.innerHTML = `
        <div class="card-top">
        <span class="mana-pill">💧 ${card.cost}</span>
        ${isSpell ? '<span class="spell-pill">SORT</span>' : ""}
        </div>
        ${createCardArtHTML(card)}
        <div class="card-name" title="${card.name}">${card.name}</div>
        ${bottomStatsHTML}
        <div class="qty-controls">
        <button class="qty-btn btn-minus" ${countInDeck === 0 ? "disabled" : ""}>-</button>
        <span class="qty-label">${countInDeck} / ${MAX_COPIES_PER_CARD}</span>
        <button class="qty-btn btn-plus" ${countInDeck >= MAX_COPIES_PER_CARD || playerDeckIds.length >= DECK_SIZE ? "disabled" : ""}>+</button>
        </div>
        `;

        cardEl.querySelector(".btn-minus").addEventListener("click", (e) => {
            e.stopPropagation();
            const idx = playerDeckIds.indexOf(card.id);
            if (idx !== -1) {
                playerDeckIds.splice(idx, 1);
                renderDeckEditor();
            }
        });

        cardEl.querySelector(".btn-plus").addEventListener("click", (e) => {
            e.stopPropagation();
            if (countInDeck < MAX_COPIES_PER_CARD && playerDeckIds.length < DECK_SIZE) {
                playerDeckIds.push(card.id);
                renderDeckEditor();
            }
        });

        deckGrid.appendChild(cardEl);
    });
}

// ============================================================================
// 5. MOTEUR DU JEU DE CARTES (3 ÉTATS : REPOS / PRÊT / UTILISÉ + SORTILÈGES)
// ============================================================================
let duelState = null;

function buildShuffledDeck(ids) {
    const instances = ids.map((id, idx) => {
        const base = CARDS_DATABASE.find((m) => m.id === id);
        return {
            ...base,
            uid: `${id}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
                              currentHp: base.hp || 0,
                              status: "summoning"
        };
    });
    return instances.sort(() => Math.random() - 0.5);
}

function startDuel() {
    isDuelActive = true;
    const pDeck = buildShuffledDeck(playerDeckIds);
    const bDeck = buildShuffledDeck(botDefaultDeckIds);

    duelState = {
        turn: 1,
        phase: "player_main",
        activeSpellUid: null,
        winner: null,
        log: "Tour 1 : Vous commencez avec 1 PM. Posez vos cartes !",
        player: {
            hp: 10,
            mana: 1,
            maxMana: 1,
            hand: pDeck.slice(0, 3),
            deck: pDeck.slice(3),
            board: new Array()
        },
        bot: {
            hp: 10,
            mana: 1,
            maxMana: 1,
            hand: bDeck.slice(0, 3),
            deck: bDeck.slice(3),
            board: new Array()
        },
        pendingBotAttacks: new Array()
    };

    document.getElementById("gameover-screen").classList.add("hidden");
    document.getElementById("duel-modal").classList.remove("hidden");
    renderDuelUI();
}

function playCardFromHand(uid) {
    if (duelState.winner) return;

    if (duelState.phase === "target_sacrifice" || duelState.phase === "target_damage") {
        duelState.phase = "player_main";
        duelState.activeSpellUid = null;
        duelState.log = "Sortilège annulé.";
        renderDuelUI();
        return;
    }

    if (duelState.phase !== "player_main") return;

    const card = duelState.player.hand.find((c) => c.uid === uid);
    if (!card || duelState.player.mana < card.cost) return;

    if (card.type === "creature") {
        if (duelState.player.board.length >= 6) return;
        duelState.player.mana -= card.cost;
        duelState.player.hand = duelState.player.hand.filter((c) => c.uid !== uid);
        duelState.player.board.push({ ...card, status: "summoning" });
        duelState.log = `Vous invoquez ${card.name} (placée à gauche, prête au prochain tour).`;
        renderDuelUI();
        return;
    }

    if (card.type === "spell") {
        if (card.spellEffect === "sacrifice_mana") {
            if (duelState.player.board.length === 0) {
                duelState.log = "Il vous faut au moins 1 monstre en jeu pour lancer Transmutation !";
                renderDuelUI();
                return;
            }
            duelState.phase = "target_sacrifice";
            duelState.activeSpellUid = uid;
            duelState.log = "Cliquez sur l'un de VOS monstres en jeu pour le sacrifier (+1 PM).";
            renderDuelUI();
            return;
        }

        if (card.spellEffect === "damage_one") {
            duelState.phase = "target_damage";
            duelState.activeSpellUid = uid;
            duelState.log = "Cliquez sur un monstre adverse OU sur la barre du Bot pour infliger 1 dégât.";
            renderDuelUI();
            return;
        }

        if (card.spellEffect === "draw_two") {
            duelState.player.mana -= card.cost;
            duelState.player.hand = duelState.player.hand.filter((c) => c.uid !== uid);
            let drawn = 0;
            for (let i = 0; i < 2; i++) {
                if (duelState.player.deck.length > 0 && duelState.player.hand.length < 7) {
                    duelState.player.hand.push(duelState.player.deck.shift());
                    drawn++;
                }
            }
            duelState.log = `Savoir Interdit : vous piochez ${drawn} carte(s) !`;
            renderDuelUI();
        }
    }
}

function executeSacrificeSpell(targetCreatureUid) {
    const spell = duelState.player.hand.find((c) => c.uid === duelState.activeSpellUid);
    const creature = duelState.player.board.find((c) => c.uid === targetCreatureUid);
    if (!spell || !creature) return;

    duelState.player.mana = duelState.player.mana - spell.cost + 1;
    duelState.player.hand = duelState.player.hand.filter((c) => c.uid !== spell.uid);
    duelState.player.board = duelState.player.board.filter((c) => c.uid !== targetCreatureUid);

    duelState.phase = "player_main";
    duelState.activeSpellUid = null;
    duelState.log = `Transmutation : ${creature.name} est sacrifié ! Vous avez maintenant ${duelState.player.mana}/${duelState.player.maxMana} PM.`;
    renderDuelUI();
}

function executeDamageSpell(targetType, targetUid = null) {
    const spell = duelState.player.hand.find((c) => c.uid === duelState.activeSpellUid);
    if (!spell) return;

    duelState.player.mana -= spell.cost;
    duelState.player.hand = duelState.player.hand.filter((c) => c.uid !== spell.uid);

    if (targetType === "bot_player") {
        duelState.bot.hp = Math.max(0, duelState.bot.hp - 1);
        duelState.log = "Éclair Arcanique inflige 1 dégât au Bot !";
        if (duelState.bot.hp === 0) duelState.winner = "Joueur";
    } else if (targetType === "bot_creature") {
        const creature = duelState.bot.board.find((c) => c.uid === targetUid);
        if (creature) {
            creature.currentHp -= 1;
            duelState.log = `Éclair Arcanique inflige 1 dégât à ${creature.name} !`;
            duelState.bot.board = duelState.bot.board.filter((c) => c.currentHp > 0);
        }
    }

    duelState.phase = "player_main";
    duelState.activeSpellUid = null;
    renderDuelUI();
}

document.getElementById("bot-bar-target").addEventListener("click", () => {
    if (duelState && duelState.phase === "target_damage") {
        executeDamageSpell("bot_player");
    }
});

function playerAttackWithCreature(attackerUid) {
    if (duelState.phase !== "player_main" || duelState.winner) return;
    const attacker = duelState.player.board.find((c) => c.uid === attackerUid);
    if (!attacker || attacker.status !== "ready") return;

    attacker.status = "used";

    const botReadyBlockers = duelState.bot.board.filter((c) => c.status === "ready");

    if (botReadyBlockers.length > 0) {
        botReadyBlockers.sort((a, b) => b.currentHp - a.currentHp);
        const blocker = botReadyBlockers.at(0);

        attacker.currentHp -= blocker.atk;
        blocker.currentHp -= attacker.atk;

        let msg = `${attacker.name} attaque ! Le Bot bloque avec ${blocker.name}. `;
        if (attacker.currentHp <= 0) msg += `${attacker.name} est détruit. `;
        if (blocker.currentHp <= 0) msg += `${blocker.name} est détruit.`;

        duelState.player.board = duelState.player.board.filter((c) => c.currentHp > 0);
        duelState.bot.board = duelState.bot.board.filter((c) => c.currentHp > 0);
        duelState.log = msg;
    } else {
        duelState.bot.hp = Math.max(0, duelState.bot.hp - attacker.atk);
        duelState.log = `${attacker.name} attaque directement le Bot (-${attacker.atk} PV) !`;
        if (duelState.bot.hp === 0) duelState.winner = "Joueur";
    }

    renderDuelUI();
}

document.getElementById("btn-end-turn").addEventListener("click", () => {
    if (duelState.phase !== "player_main" || duelState.winner) return;

    duelState.bot.maxMana = Math.min(5, duelState.bot.maxMana + 1);
    duelState.bot.mana = duelState.bot.maxMana;
    if (duelState.bot.deck.length > 0 && duelState.bot.hand.length < 7) {
        duelState.bot.hand.push(duelState.bot.deck.shift());
    }

    duelState.bot.board.forEach((c) => (c.status = "ready"));
    const attackers = new Array(...duelState.bot.board);

    duelState.bot.hand.sort((a, b) => b.cost - a.cost);
    const remainingHand = new Array();
    for (const card of duelState.bot.hand) {
        if (card.type === "creature" && card.cost <= duelState.bot.mana && duelState.bot.board.length < 6) {
            duelState.bot.mana -= card.cost;
            duelState.bot.board.push({ ...card, status: "summoning" });
        } else {
            remainingHand.push(card);
        }
    }
    duelState.bot.hand = remainingHand;

    if (attackers.length > 0) {
        duelState.phase = "player_block";
        duelState.pendingBotAttacks = attackers;
        const firstAtk = attackers.at(0);
        duelState.log = `Le Bot attaque avec ${firstAtk.name} (${firstAtk.atk} ATK) ! Cliquez sur une créature PRÊTE (au milieu) pour bloquer.`;
        renderDuelUI();
    } else {
        startNextPlayerTurn("Le Bot a terminé son tour.");
    }
});

function resolveBotAttack(blockerUid) {
    if (duelState.phase !== "player_block" || duelState.winner) return;

    const currentAttacker = duelState.pendingBotAttacks.shift();
    const botCreature = duelState.bot.board.find((c) => c.uid === currentAttacker.uid);
    if (botCreature) botCreature.status = "used";

    let msg = "";
    if (blockerUid) {
        const blocker = duelState.player.board.find((c) => c.uid === blockerUid);
        if (blocker && blocker.status === "ready" && botCreature) {
            botCreature.currentHp -= blocker.atk;
            blocker.currentHp -= botCreature.atk;
            msg = `Votre ${blocker.name} bloque ${botCreature.name} ! `;

            duelState.player.board = duelState.player.board.filter((c) => c.currentHp > 0);
            duelState.bot.board = duelState.bot.board.filter((c) => c.currentHp > 0);
        } else {
            return;
        }
    } else {
        duelState.player.hp = Math.max(0, duelState.player.hp - currentAttacker.atk);
        msg = `Vous encaissez ${currentAttacker.atk} dégâts directs de ${currentAttacker.name} ! `;
    }

    if (duelState.player.hp === 0) {
        duelState.winner = "Bot";
        duelState.log = "Vous n'avez plus de points de vie. Défaite !";
        renderDuelUI();
        return;
    }

    if (duelState.pendingBotAttacks.length > 0) {
        const nextAtk = duelState.pendingBotAttacks.at(0);
        duelState.log = `${msg} Le Bot attaque ensuite avec ${nextAtk.name} (${nextAtk.atk} ATK) !`;
        renderDuelUI();
    } else {
        startNextPlayerTurn(msg);
    }
}

document.getElementById("btn-take-damage").addEventListener("click", () => {
    resolveBotAttack(null);
});

function startNextPlayerTurn(previousLog) {
    duelState.turn += 1;
    duelState.phase = "player_main";

    duelState.player.maxMana = Math.min(5, duelState.player.maxMana + 1);
    duelState.player.mana = duelState.player.maxMana;

    if (duelState.player.deck.length > 0 && duelState.player.hand.length < 7) {
        duelState.player.hand.push(duelState.player.deck.shift());
    }

    duelState.player.board.forEach((c) => (c.status = "ready"));
    duelState.log = `${previousLog} — Tour ${duelState.turn} : Vos monstres sont prêts au milieu !`;
    renderDuelUI();
}

// ============================================================================
// 6. RENDU VISUEL DU PLATEAU DE DUEL (3 COLONNES PAR JOUEUR)
// ============================================================================
function renderBoardZones(boardArray, prefixId, isPlayerSide) {
    const zones = {
        summoning: document.getElementById(`${prefixId}-zone-summoning`),
        ready: document.getElementById(`${prefixId}-zone-ready`),
        used: document.getElementById(`${prefixId}-zone-used`)
    };

    zones.summoning.innerHTML = "";
    zones.ready.innerHTML = "";
    zones.used.innerHTML = "";

    const currentBotAttacker = duelState.pendingBotAttacks.at(0);

    boardArray.forEach((c) => {
        const el = document.createElement("div");
        let extraClass = "";
        let statusTag = "";

        if (c.status === "summoning") {
            statusTag = "💤 Repos";
        } else if (c.status === "ready") {
            statusTag = "⚡ Prêt";
        } else if (c.status === "used") {
            statusTag = "Utilisé";
            extraClass = "exhausted-card";
        }

        if (isPlayerSide) {
            if (duelState.phase === "target_sacrifice") {
                extraClass = "targetable";
                statusTag = "🎯 Sacrifier";
            } else if (duelState.phase === "player_main" && c.status === "ready") {
                extraClass = "can-act";
                statusTag = "⚔️ Attaquer";
            } else if (duelState.phase === "player_block" && c.status === "ready") {
                extraClass = "can-act";
                statusTag = "🛡️ Bloquer";
            }
        } else {
            if (duelState.phase === "target_damage") {
                extraClass = "targetable";
                statusTag = "🎯 Cibler";
            } else if (
                duelState.phase === "player_block" &&
                currentBotAttacker &&
                currentBotAttacker.uid === c.uid
            ) {
                extraClass = "attacking-now";
                statusTag = "⚔️ Attaque !";
            }
        }

        el.className = `card ${extraClass}`;
        el.innerHTML = `
        <div class="card-top"><span class="card-status-tag">${statusTag}</span></div>
        ${createCardArtHTML(c)}
        <div class="card-name">${c.name}</div>
        <div class="card-stats">
        <span class="stat-atk">⚔️ ${c.atk}</span>
        <span class="stat-hp">❤️ ${c.currentHp}</span>
        </div>
        `;

        el.addEventListener("click", () => {
            if (isPlayerSide) {
                if (duelState.phase === "target_sacrifice") {
                    executeSacrificeSpell(c.uid);
                } else if (duelState.phase === "player_main" && c.status === "ready") {
                    playerAttackWithCreature(c.uid);
                } else if (duelState.phase === "player_block" && c.status === "ready") {
                    resolveBotAttack(c.uid);
                }
            } else {
                if (duelState.phase === "target_damage") {
                    executeDamageSpell("bot_creature", c.uid);
                }
            }
        });

        zones[c.status].appendChild(el);
    });
}

function renderDuelUI() {
    document.getElementById("bot-hp").textContent = `❤️ ${duelState.bot.hp} PV`;
    document.getElementById("bot-mana").textContent = `💧 ${duelState.bot.mana}/${duelState.bot.maxMana} PM`;
    document.getElementById("bot-hand-count").textContent = `Main : ${duelState.bot.hand.length}`;

    document.getElementById("player-hp").textContent = `❤️ ${duelState.player.hp} PV`;
    document.getElementById("player-mana").textContent = `💧 ${duelState.player.mana}/${duelState.player.maxMana} PM`;
    document.getElementById("player-deck-count").textContent = `Pioche : ${duelState.player.deck.length}`;
    document.getElementById("duel-log").textContent = duelState.log;

    const botBarEl = document.getElementById("bot-bar-target");
    if (duelState.phase === "target_damage") {
        botBarEl.classList.add("targetable-player");
    } else {
        botBarEl.classList.remove("targetable-player");
    }

    const btnEndTurn = document.getElementById("btn-end-turn");
    const btnTakeDmg = document.getElementById("btn-take-damage");
    const currentBotAttacker = duelState.pendingBotAttacks.at(0);

    if (duelState.phase === "player_block" && !duelState.winner) {
        btnEndTurn.classList.add("hidden");
        btnTakeDmg.classList.remove("hidden");
        btnTakeDmg.textContent = `Encaisser (-${currentBotAttacker ? currentBotAttacker.atk : 0} PV)`;
    } else {
        btnTakeDmg.classList.add("hidden");
        btnEndTurn.classList.remove("hidden");
    }

    renderBoardZones(duelState.bot.board, "bot", false);
    renderBoardZones(duelState.player.board, "player", true);

    const handEl = document.getElementById("player-hand");
    handEl.innerHTML = "";
    duelState.player.hand.forEach((c) => {
        const isSpell = c.type === "spell";
        const playable =
        (duelState.phase === "player_main" || duelState.activeSpellUid === c.uid) &&
        duelState.player.mana >= c.cost &&
        (isSpell || duelState.player.board.length < 6);

        const el = document.createElement("div");
        el.className = `card ${isSpell ? "spell-card" : ""} ${playable ? "playable" : "unplayable"}`;

        const bodyHTML = isSpell
        ? `<div class="card-desc">${c.desc}</div>`
        : `<div class="card-stats">
        <span class="stat-atk">⚔️ ${c.atk}</span>
        <span class="stat-hp">❤️ ${c.hp}</span>
        </div>`;

        el.innerHTML = `
        <div class="card-top">
        <span class="mana-pill">💧 ${c.cost}</span>
        ${isSpell ? '<span class="spell-pill">SORT</span>' : ""}
        </div>
        ${createCardArtHTML(c)}
        <div class="card-name">${c.name}</div>
        ${bodyHTML}
        `;

        if (playable) {
            el.addEventListener("click", () => playCardFromHand(c.uid));
        }
        handEl.appendChild(el);
    });

    if (duelState.winner) {
        const goScreen = document.getElementById("gameover-screen");
        document.getElementById("gameover-title").textContent =
        duelState.winner === "Joueur" ? "🏆 VICTOIRE !" : "💀 DÉFAITE...";
        document.getElementById("gameover-desc").textContent =
        duelState.winner === "Joueur"
        ? "Vous avez réduit les points de vie du Bot à 0 !"
        : "Vos points de vie sont tombés à 0.";
        goScreen.classList.remove("hidden");
    }
}

function exitDuel() {
    isDuelActive = false;
    duelState = null;
    document.getElementById("duel-modal").classList.add("hidden");
    handleSitToggle();
}

document.getElementById("btn-quit-duel").addEventListener("click", exitDuel);
document.getElementById("btn-return-class").addEventListener("click", exitDuel);

// ============================================================================
// 7. INITIALISATION AU LANCEMENT
// ============================================================================
initClassroom();
updateAndDrawClassroom();

