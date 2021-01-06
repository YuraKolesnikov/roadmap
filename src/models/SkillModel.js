const SkillCategoryModel = {
	HARD: {
		id: 1,
		title: 'Hard skills'
	},

	SOFT: {
		id: 2,
		title: 'Soft skills'
	},

	LANGUAGE: {
		id: 3,
		title: 'Language skills'
	},

	OTHER: {
		id: 4,
		title: 'Other skills'
	}
}

SkillCategoryModel.LIST = [
	SkillCategoryModel.HARD,
	SkillCategoryModel.SOFT,
	SkillCategoryModel.LANGUAGE,
	SkillCategoryModel.OTHER
]

SkillCategoryModel.ID_TO_DATA = {
	[SkillCategoryModel.HARD.id]: SkillCategoryModel.HARD,
	[SkillCategoryModel.SOFT.id]: SkillCategoryModel.SOFT,
	[SkillCategoryModel.LANGUAGE.id]: SkillCategoryModel.LANGUAGE,
	[SkillCategoryModel.OTHER.id]: SkillCategoryModel.OTHER
}

const SkillModel = {
	HTML: {
		id: 1,
		category_id: SkillCategoryModel.HARD.id,
		title: 'HTML'
	},

	CSS: {
		id: 2,
		category_id: SkillCategoryModel.HARD.id,
		title: 'CSS'
	},

	JS_BASICS: {
		id: 3,
		category_id: SkillCategoryModel.HARD.id,
		title: 'JavaScript Basics'
	},

	JS_ADVANCED: {
		id: 4,
		category_id: SkillCategoryModel.HARD.id,
		title: 'Advanced JavaScript'
	},

	UX_UI: {
		id: 5,
		category_id: SkillCategoryModel.HARD.id,
		title: 'UX/UI'
	},

	PROBLEM_SOLVING: {
		id: 6,
		category_id: SkillCategoryModel.SOFT.id,
		title: 'Problem solving'
	},

	ENGLISH: {
		id: 7,
		category_id: SkillCategoryModel.LANGUAGE.id
	}
}

SkillModel.ID_TO_DATA = {
	[SkillModel.HTML.id]: SkillModel.HTML,
	[SkillModel.CSS.id]: SkillModel.CSS,
	[SkillModel.JS_BASICS.id]: SkillModel.JS_BASICS,
	[SkillModel.JS_ADVANCED.id]: SkillModel.JS_ADVANCED,
	[SkillModel.UX_UI.id]: SkillModel.UX_UI,
	[SkillModel.PROBLEM_SOLVING.id]: SkillModel.PROBLEM_SOLVING,
	[SkillModel.ENGLISH.id]: SkillModel.ENGLISH,
}

export {
	SkillCategoryModel,
	SkillModel
}
