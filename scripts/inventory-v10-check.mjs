import { readFileSync } from 'node:fs';

const schema = readFileSync('apps/api/prisma/schema.prisma', 'utf8');
const appModule = readFileSync('apps/api/src/app.module.ts', 'utf8');
const controller = readFileSync('apps/api/src/inventory/inventory.controller.ts', 'utf8');
const service = readFileSync('apps/api/src/inventory/inventory.service.ts', 'utf8');
const profilePage = readFileSync('apps/web/app/u/[username]/page.tsx', 'utf8');
const panel = readFileSync('apps/web/app/u/[username]/inventory-panel.tsx', 'utf8');
const css = readFileSync('apps/web/app/globals.css', 'utf8');

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) {
    throw new Error(`${label}: missing ${marker}`);
  }
}

function forbidMarker(source, marker, label) {
  if (source.includes(marker)) {
    throw new Error(`${label}: forbidden ${marker}`);
  }
}

requireMarker(schema, 'FORRUM_INVENTORY_V10', 'schema');
requireMarker(schema, 'model InventoryItemDefinition', 'schema definition');
requireMarker(schema, 'model UserInventoryItem', 'schema ownership');
requireMarker(schema, 'model InventoryTransaction', 'schema history');
requireMarker(appModule, 'InventoryModule', 'app module');
requireMarker(controller, "@Get('users/:username')", 'public inventory route');
requireMarker(controller, "@Post('items/:id/equip')", 'equip route');
requireMarker(controller, "@Post('items/:id/unequip')", 'unequip route');
requireMarker(controller, "@Post('items/:id/transfer')", 'transfer route');
requireMarker(controller, "@Delete('items/:id')", 'delete route');
requireMarker(service, 'SET "equipped" = true', 'equip behavior');
requireMarker(service, 'SET "ownerId" = $1', 'transfer behavior');
requireMarker(service, 'SET "deletedAt" = NOW()', 'soft delete behavior');
requireMarker(profilePage, 'InventoryPanel', 'profile inventory');
requireMarker(panel, 'Передать', 'item menu transfer');
requireMarker(panel, 'Удалить', 'item menu delete');
requireMarker(panel, "selected.equipped ? 'Снять' : 'Надеть'", 'item menu equip toggle');
requireMarker(panel, 'role="dialog"', 'accessible item menu');
requireMarker(css, 'FORRUM_INVENTORY_V10', 'inventory styles');
forbidMarker(panel.toLowerCase(), 'слот', 'visible slot terminology');
forbidMarker(panel.toLowerCase(), 'slot', 'slot terminology');

console.log('FORRUM Inventory V10 contract passed.');
