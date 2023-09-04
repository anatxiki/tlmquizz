import setuptools

setuptools.setup(
	name="tfgatxiki",
	version="0.1",
	description="TFG ana",
	author="atxiki",
	author_email="calvo.111979@e.unavarra.es",
	url="",
	packages=setuptools.find_packages(),
	pyhton_requires=">=3.8",
	install_requires=['flask'],
	extras_require={},
	entry_points={'console_scripts': ['tfg-back=tfgatxiki.main:main']}
)
