// Export messages with the name of the event on NPM
export function packageStar(e) {
	return `\`${e.name}\` was just starred  :simple_smile:`;
}

export function packageUnstar(e) {
	return `\`${e.name}\` was just unstarred  :frowning:`;
}

export function packagePublish(e) {
	return `\`${e.name}\` just published version \`${e.change.version}\`  :tada:`;
}

export function packageUnpublish(e) {
	return `\`${e.name}\` just unpublished version \`${e.change.version}\`  :ghost:`;
}

export function packageOwner(e) {
	return `\`${e.name}\` added owner *${e.change.maintainer}*  :raised_hands:`;
}

export function packageOwnerRm(e) {
	return `\`${e.name}\` removed owner *${e.change.maintainer}*  :rotating_light:`;
}

export function packageDistTag(e) {
	return `\`${e.name}\` dist-tag *${e.change['dist-tag']}* changed to version \`${e.payload['dist-tags'][e.change['dist-tag']]}\`  :arrows_counterclockwise:`;
}

export function packageDistTagRm(e) {
	return `\`${e.name}\` dist-tag *${e.change['dist-tag']}* removed  :fire:`;
}

export function packageDeprecated(e) {
	return `\`${e.name}\` deprecated version \`${e.change.deprecated}\`  :no_entry_sign:`;
}

export function packageUndeprecated(e) {
	return `\`${e.name}\` undeprecated version \`${e.change.deprecated}\`  :angel:`;
}

export function packageChange(e) {
	if (e.payload.time.modified === e.payload.time.created) {
		return `\`${e.name}\` published first version \`${e.payload['dist-tags'].latest}\`  :boom:`;
	}
	return `\`${e.name}\` changed...  :interrobang:`;
}
