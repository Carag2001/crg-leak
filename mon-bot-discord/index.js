// ===================================
// IMPORTS
// ===================================
require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const mongoose = require('mongoose');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

// ===================================
// CONFIGURATION
// ===================================
const config = require('./config.json');

// ===================================
// CLIENT DISCORD
// ===================================
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.User,
        Partials.GuildMember
    ]
});

// ===================================
// COLLECTIONS
// ===================================
client.commands = new Collection();
client.cooldowns = new Collection();
client.config = config;
client.color = config.colors;
client.emoji = config.emojis;

// ===================================
// CONNEXION MONGODB
// ===================================
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(chalk.green('✅ Connecté à MongoDB !'));
}).catch((err) => {
    console.log(chalk.red('❌ Erreur de connexion à MongoDB:'), err);
    process.exit(1);
});

// ===================================
// CHARGEMENT DES HANDLERS
// ===================================
console.log(chalk.yellow('⏳ Chargement des handlers...'));

// Handler des commandes
const commandHandler = require('./handlers/commandHandler');
commandHandler(client);

// Handler des événements
const eventHandler = require('./handlers/eventHandler');
eventHandler(client);

console.log(chalk.green('✅ Handlers chargés !'));

// ===================================
// GESTION DES ERREURS
// ===================================
process.on('unhandledRejection', (error) => {
    console.error(chalk.red('❌ Erreur non gérée (Rejection):'), error);
});

process.on('uncaughtException', (error) => {
    console.error(chalk.red('❌ Erreur non gérée (Exception):'), error);
});

// ===================================
// CONNEXION DU BOT
// ===================================
client.login(process.env.DISCORD_TOKEN).catch((err) => {
    console.log(chalk.red('❌ Erreur de connexion au bot:'), err);
    process.exit(1);
});

// ===================================
// EXPORT
// ===================================
module.exports = client;
